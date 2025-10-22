import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

const InsertItem = createInsertSchema(table.item);
const SelectItem = createSelectSchema(table.item);

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
    response: SelectItem.array(),
  })
  .get("/:id", "", {
    params: "id",
    response: SelectItem,
  })
  .post("", "", {
    body: InsertItem,
    response: SelectItem,
  })
  .put("/:id", "", {
    params: "id",
    body: InsertItem,
    response: SelectItem,
  })
  .delete("/:id", "", {
    params: "id",
    response: SelectItem,
  });
