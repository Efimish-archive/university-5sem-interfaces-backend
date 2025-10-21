import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

export const users = new Elysia({ prefix: "/users" })
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
    response: createSelectSchema(table.user).array(),
  })
  .get("/:id", "", {
    params: "id",
    response: createSelectSchema(table.user),
  })
  .put("/:id", "", {
    params: "id",
    body: createInsertSchema(table.user),
    response: createSelectSchema(table.user),
  })
  .delete("/:id", "", {
    params: "id",
    response: createSelectSchema(table.user),
  })
