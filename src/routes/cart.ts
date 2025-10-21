import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

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
    response: createSelectSchema(table.cartItem),
  })
  .get("/:id", "", {
    params: "id",
    response: createSelectSchema(table.cartItem),
  })
  .post("", "", {
    body: createInsertSchema(table.cartItem),
    response: createSelectSchema(table.cartItem),
  })
  .put("/:id", "", {
    params: "id",
    body: createInsertSchema(table.cartItem),
    response: createSelectSchema(table.cartItem),
  })
  .delete("/:id", "", {
    params: "id",
    response: createSelectSchema(table.cartItem),
  });
