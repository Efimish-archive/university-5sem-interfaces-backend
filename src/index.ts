import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi"
import { z } from "zod";

import env from "./env";
import { auth } from "./routes/auth";
import { items } from "./routes/items";
import { users } from "./routes/users";
import { orders } from "./routes/orders";
import { cart } from "./routes/cart";

const app = new Elysia()
  .use(openapi({
    documentation: {
      info: {
        title: "Магазин электроники API",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearer: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
    },
    mapJsonSchema: {
      zod: z.toJSONSchema
    }
  }))
  .use(auth)
  .use(items)
  .use(users)
  .use(orders)
  .use(cart)
  .listen(env.PORT);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
