import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import { profilesTable, todosTable } from "./schema";
config({ path: ".env.local" });
const schema = {profiles: profilesTable, todos: todosTable}

const sql = postgres(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });