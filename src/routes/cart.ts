import { Elysia } from "elysia";
import { z } from "zod";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

const InsertCartItem = createInsertSchema(table.cartItem);
const InsertCart = z.object({
  userId: z.number(),
  items: InsertCartItem.array(),
});
const SelectCartItem = createSelectSchema(table.cartItem);
const SelectCart = z.object({
  userId: z.number(),
  items: SelectCartItem.array(),
});

export const cart = new Elysia({ prefix: "/cart" })
  .use(context)
  .guard({
    response: {
      400: "error",
      401: "error",
    },
    detail: {
      security: [{ bearer: [] }],
    },
  })
  .get("", "", {
    response: SelectCart.array(),
  })
  .get("/:id", "", {
    params: "id",
    response: SelectCart,
  })
  .post("", "", {
    body: InsertCart,
    response: SelectCart,
  })
  .put("/:id", "", {
    params: "id",
    body: InsertCart,
    response: SelectCart,
  })
  .delete("/:id", "", {
    params: "id",
    response: SelectCart,
  });
