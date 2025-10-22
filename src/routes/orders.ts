import { Elysia } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { context } from "../context";
import { table } from "../database/schema";

const InsertOrder = createInsertSchema(table.order);
const SelectOrder = createSelectSchema(table.order);
const SelectOrderItem = createSelectSchema(table.orderItem);
const SelectOrderWithItems = SelectOrder.extend({
  items: SelectOrderItem.array(),
});

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
    response: SelectOrder.array()
  })
  .get("/:id", "", {
    params: "id",
    response: SelectOrderWithItems,
  })
  .post("", "", {
    body: InsertOrder,
    response: SelectOrder,
  })
  .put("/:id", "", {
    params: "id",
    body: InsertOrder,
    response: SelectOrder,
  })
  .delete("/:id", "", {
    params: "id",
    response: SelectOrder,
  });
