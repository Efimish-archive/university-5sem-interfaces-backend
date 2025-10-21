import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, primaryKey, integer, text, boolean, date, serial } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  isManager: boolean('is_manager').notNull().default(false),
  createdAt: date('created_at').notNull().defaultNow(),
});

export const item = pgTable('item', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  unitsInStock: integer('units_in_stock').notNull().default(0),
  createdAt: date('created_at').notNull().defaultNow(),
});

export const order = pgTable('order', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => user.id).notNull(),
  status: text('status').notNull().default("pending"), // TODO: enum ["pending" | "packed" | "completed" | "canceled"]
  totalPrice: integer('total_price').notNull(), // WARN: denormalization
  createdAt: date('created_at').notNull().defaultNow(),
});

export const cartItem = pgTable('cart_item', {
  userId: integer('user_id').references(() => user.id).notNull(),
  itemId: integer('item_id').references(() => item.id).notNull(),
  amount: integer('amount').notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.itemId] })
]);

export const orderItem = pgTable('order_item', {
  orderId: integer('order_id').references(() => order.id).notNull(),
  itemId: integer('item_id').references(() => item.id).notNull(),
  amount: integer('amount').notNull().default(1),
}, (table) => [
  primaryKey({ columns: [table.orderId, table.itemId] })
]);

export const table = {
  user,
  item,
  order,
  cartItem,
  orderItem
} as const;

export type Table = typeof table;
