import { Elysia, t } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { z } from "zod";

import env from "./env";

export const context = new Elysia({ name: "context" })
  .use(jwt({
    name: "jwt",
    secret: env.JWT_SECRET,
  }))
  .model({
    credentials: z.object({
      username: z.string(),
      password: z.string(),
    }),
    error: z.object({
      error: z.string(),
    }),
    message: z.object({
      message: z.string(),
    }),
    token: z.object({
      token: z.string(),
    }),
    id: z.object({
      id: z.coerce.number(),
    }),
  });
