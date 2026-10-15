import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "../config.js";

// Limitation de débit en mémoire, par IP et par fenêtre fixe.
const buckets = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now - bucket.start >= RATE_LIMIT_WINDOW_MS) buckets.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

export default function rateLimit(req, res, next) {
  const key = req.ip || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.start >= RATE_LIMIT_WINDOW_MS) {
    buckets.set(key, { start: now, count: 1 });
    return next();
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((bucket.start + RATE_LIMIT_WINDOW_MS - now) / 1000);
    res.setHeader("Retry-After", String(retryAfter));
    return res.status(429).json({ error: "Trop de requêtes. Réessayez dans un instant." });
  }
  return next();
}
