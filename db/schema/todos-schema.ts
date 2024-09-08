import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { profilesTable } from "./profiles-schema";

export const todosTable = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => profilesTable.userId).notNull(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export type SelectTodo = typeof todosTable.$inferSelect;
export type InsertTodo = typeof todosTable.$inferInsert;