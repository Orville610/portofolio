import { NextRequest, NextResponse } from "next/server";
import { createSession, deleteSession, isAdmin, limitLoginAttempts, passwordMatches, requireAdminConfiguration, SESSION_COOKIE, SESSION_TTL, sessionCookieOptions } from "@/lib/server/auth";
import { errorResponse, HttpError, noStore, readJson, requireSameOrigin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try { return NextResponse.json({ authenticated: await isAdmin(request) }, { headers: noStore }); }
  catch (error) { return errorResponse(error); }
}
export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const correctPassword = requireAdminConfiguration();
    await limitLoginAttempts(request);
    const data = await readJson(request, 2048);
    if (!data || typeof data !== "object" || !("password" in data) || typeof data.password !== "string" || data.password.length > 1024) {
      throw new HttpError(400, "Enter a valid password.");
    }
    if (!passwordMatches(data.password, correctPassword)) throw new HttpError(401, "Incorrect password.");
    const token = await createSession(correctPassword);
    const response = NextResponse.json({ success: true }, { headers: noStore });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, maxAge: SESSION_TTL });
    return response;
  } catch (error) { return errorResponse(error); }
}
export async function DELETE(request: NextRequest) {
  try {
    requireSameOrigin(request);
    await deleteSession(request);
    const response = NextResponse.json({ success: true }, { headers: noStore });
    response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
    return response;
  } catch (error) { return errorResponse(error); }
}
