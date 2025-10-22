import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

const InsertUser = createInsertSchema(table.user);
const SelectUser = createSelectSchema(table.user);

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
  .get("", "", {
    response: SelectUser.array(),
  })
  .get("/:id", "", {
    params: "id",
    response: SelectUser,
  })
  .put("/:id", "", {
    params: "id",
    body: InsertUser,
    response: SelectUser,
  })
  .delete("/:id", "", {
    params: "id",
    response: SelectUser,
  })
