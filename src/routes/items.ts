import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

export const items = new Elysia({ prefix: "/items" })
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
    response: createSelectSchema(table.item).array(),
  })
  .get("/:id", "", {
    params: "id",
    response: createSelectSchema(table.item),
  })
  .post("", "", {
    body: createInsertSchema(table.item),
    response: createSelectSchema(table.item),
  })
  .put("/:id", "", {
    params: "id",
    body: createInsertSchema(table.item),
    response: createSelectSchema(table.item),
  })
  .delete("/:id", "", {
    params: "id",
    response: createSelectSchema(table.item),
  });
