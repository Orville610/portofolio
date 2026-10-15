import "server-only";
import { NextResponse } from "next/server";

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export const noStore = { "Cache-Control": "private, no-store, max-age=0" };

export function requireSameOrigin(request: Request): void {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    throw new HttpError(403, "Request origin is not allowed.");
  }
}
export async function readJson(request: Request, limit = 65536): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new HttpError(415, "Send JSON data.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "Request body is required.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limit) {
        await reader.cancel();
        throw new HttpError(413, "Request is too large.");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(body)); }
  catch { throw new HttpError(400, "Invalid JSON data."); }
}
export function errorResponse(error: unknown): NextResponse {
  const status = error instanceof HttpError ? error.status : 503;
  const message = error instanceof HttpError ? error.message : "The service is temporarily unavailable. Please try again.";
  return NextResponse.json({ success: false, message }, { status, headers: noStore });
}
