import { z } from "zod";

const Env = z.object({
  PORT: z.coerce.number().default(3000),
  POSTGRES_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const env = Env.parse(process.env);

export default env;
