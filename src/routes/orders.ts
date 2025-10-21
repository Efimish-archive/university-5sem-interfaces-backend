import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

export const orders = new Elysia({ prefix: "/orders" })
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
  .get("", () => [], {
    response: createSelectSchema(table.order).array()
  })
  .get("/:id", "", {
    params: "id",
    response: createSelectSchema(table.order),
  })
  .post("", "", {
    body: createInsertSchema(table.order),
    response: createSelectSchema(table.order),
  })
  .put("/:id", "", {
    params: "id",
    body: createInsertSchema(table.order),
    response: createSelectSchema(table.order),
  })
  .delete("/:id", "", {
    params: "id",
    response: createSelectSchema(table.order),
  });
