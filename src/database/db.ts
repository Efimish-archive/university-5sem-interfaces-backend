import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

import env from "../env";

const db = drizzle({
  connection: env.DATABASE_URL,
  schema,
  casing: 'snake_case'
});

export default db;
