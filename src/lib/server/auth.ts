import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { redisCommand, storageConfigured } from "./redis";
import { HttpError } from "./http";

export const SESSION_COOKIE = "portfolio_admin";
export const SESSION_TTL = 3600;

function passwordDigest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}
export function requireAdminConfiguration(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 16 || !storageConfigured()) {
    throw new HttpError(503, "Admin editing is not configured. Set a strong ADMIN_PASSWORD and connect Upstash Redis.");
  }
  return password;
}
function sessionKey(token: string): string {
  return "portfolio:session:" + createHash("sha256").update(token).digest("hex");
}
export async function isAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const password = process.env.ADMIN_PASSWORD;
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token) || !password || password.length < 16 || !storageConfigured()) return false;
  const stored = await redisCommand<string | null>(["GET", sessionKey(token)]);
  const expected = passwordDigest(password).toString("hex");
  return typeof stored === "string" && stored.length === expected.length && timingSafeEqual(Buffer.from(stored), Buffer.from(expected));
}
export async function limitLoginAttempts(request: NextRequest): Promise<void> {
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = "portfolio:login:" + createHash("sha256").update(ip).digest("hex");
  const script = "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],ARGV[1]); end; return {a,b}";
  const counts = await redisCommand<number[]>(["EVAL", script, 2, key, "portfolio:login:global", 900]);
  if (!Array.isArray(counts) || counts.length !== 2 || counts.some(count => !Number.isFinite(count))) throw new Error("Invalid rate limit response");
  if (counts[0] > 5 || counts[1] > 100) throw new HttpError(429, "Too many login attempts. Try again in 15 minutes.");
}
export function passwordMatches(value: string, correct: string): boolean {
  return timingSafeEqual(passwordDigest(value), passwordDigest(correct));
}
export async function createSession(password: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const result = await redisCommand<string>(["SET", sessionKey(token), passwordDigest(password).toString("hex"), "EX", SESSION_TTL]);
  if (result !== "OK") throw new Error("Session was not saved");
  return token;
}
export async function deleteSession(request: NextRequest): Promise<void> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token && /^[A-Za-z0-9_-]{43}$/.test(token)) await redisCommand(["DEL", sessionKey(token)]);
}
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/api",
};
