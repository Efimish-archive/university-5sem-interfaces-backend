import { pgTable, uuid, text, timestamp, real, boolean, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const users = pgTable("user", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().unique().notNull(),
  passwordHash: text().notNull(),
  isManager: boolean().default(false).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  cartItems: many(cartItem),
  orders: many(orders),
}));

export const items = pgTable("item", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  price: real().notNull(),
  unitsInStock: integer().default(0).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const itemsRelations = relations(items, ({ many }) => ({
  cartItems: many(cartItem),
  orders: many(orders),
}));

export const orders = pgTable("order", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid().references(() => users.id).notNull(),
  status: text({ enum: ["pending", "packed", "completed", "canceled"] }).default("pending").notNull(),
  totalPrice: integer().notNull(), // WARN: denormalization
  createdAt: timestamp().defaultNow().notNull(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));

export const cartItem = pgTable("cart_item", {
  userId: integer().references(() => users.id).notNull(),
  itemId: integer().references(() => items.id).notNull(),
  amount: integer().notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.itemId] })
]);

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  user: one(users, {
    fields: [cartItem.userId],
    references: [users.id],
  }),
  item: one(items, {
    fields: [cartItem.itemId],
    references: [items.id],
  }),
}));

export const orderItem = pgTable("order_item", {
  orderId: integer().references(() => orders.id).notNull(),
  itemId: integer().references(() => items.id).notNull(),
  amount: integer().default(1).notNull(),
}, (table) => [
  primaryKey({ columns: [table.orderId, table.itemId] })
]);

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(orders, {
    fields: [orderItem.orderId],
    references: [orders.id],
  }),
  item: one(items, {
    fields: [orderItem.itemId],
    references: [items.id],
  }),
}));
