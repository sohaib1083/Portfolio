import dns from "node:dns/promises";
import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ??
  "mongodb+srv://sohaib1083_db_user:XJP5yLgnFoy9U7np@cluster0.3tywifi.mongodb.net/portfolio?appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/* ── Cache connection across hot-reloads in dev ─────── */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
if (!global._mongooseCache) global._mongooseCache = cached;

/* ── mongodb+srv:// without the TXT lookup ───────────
   The driver resolves both an SRV and a TXT record for +srv URIs. Some networks
   drop TXT queries (queryTxt ETIMEOUT after ~25s) while SRV answers instantly,
   so resolve SRV ourselves and connect with an explicit host list. The TXT
   record only carries Atlas defaults (authSource, replicaSet), and the driver
   discovers the replica set from the hosts on its own. */
async function resolveUri(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return uri;
  const url = new URL(uri);
  const records = await dns.resolveSrv(`_mongodb._tcp.${url.hostname}`);
  const hosts = records.map((r) => `${r.name}:${r.port}`).join(",");
  const params = new URLSearchParams(url.search);
  params.set("tls", "true");
  if (!params.has("authSource")) params.set("authSource", "admin");
  const auth = url.username ? `${url.username}:${url.password}@` : "";
  return `mongodb://${auth}${hosts}${url.pathname}?${params}`;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = resolveUri(MONGODB_URI)
      .then((uri) =>
        mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 10000 })
      )
      .catch((err) => {
        // Don't cache a failure forever: let the next request try again.
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
