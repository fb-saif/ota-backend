import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  prepare: false, // Required for Supabase transaction pooler
});

// Pass schema for relational query support (required by Hot Updater)
export const db = drizzle(client, { schema });
