/* Local-only Redis REST fixture. Never deployed or imported by the application. */
import http from "node:http";
const entries = new Map();
let failWrites = false;
function get(key) {
  const entry = entries.get(key);
  if (entry?.expires && entry.expires < Date.now()) { entries.delete(key); return null; }
  return entry?.value ?? null;
}
http.createServer(async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  const send = (status, data) => { response.writeHead(status); response.end(JSON.stringify(data)); };
  if (request.url === "/health") return send(200, { ok: true });
  let raw = "";
  for await (const chunk of request) raw += chunk;
  try {
    const body = JSON.parse(raw);
    if (request.url === "/__control") {
      if (body.reset) { entries.clear(); failWrites = false; }
      if (typeof body.failWrites === "boolean") failWrites = body.failWrites;
      if (body.expireSessions) for (const key of entries.keys()) if (key.startsWith("portfolio:session:")) entries.delete(key);
      if (body.legacy) entries.set("portfolio_data", { value: JSON.stringify(body.legacy) });
      return send(200, { ok: true });
    }
    if (request.headers.authorization !== "Bearer local-fixture-token") return send(401, { error: "Unauthorized" });
    const [command, key, value, , ttl] = body;
    if (command === "GET") return send(200, { result: get(key) });
    if (command === "SET") {
      if (failWrites) return send(503, { error: "Simulated storage outage" });
      entries.set(key, { value, expires: ttl ? Date.now() + Number(ttl) * 1000 : undefined });
      return send(200, { result: "OK" });
    }
    if (command === "DEL") return send(200, { result: Number(entries.delete(key)) });
    if (command === "EVAL") {
      const counts = [body[3], body[4]].map(rateKey => {
        const previous = get(rateKey);
        const count = Number(previous || 0) + 1;
        entries.set(rateKey, { value: count, expires: previous ? entries.get(rateKey).expires : Date.now() + Number(body[5]) * 1000 });
        return count;
      });
      return send(200, { result: counts });
    }
    return send(400, { error: "Unsupported fixture command" });
  } catch { send(400, { error: "Invalid fixture request" }); }
}).listen(3311, "127.0.0.1", () => console.log("Local Redis fixture ready on 3311"));
