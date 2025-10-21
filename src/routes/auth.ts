import { Elysia } from "elysia";
import { context } from "../context";

export const auth = new Elysia({ prefix: "/auth" })
  .use(context)
  .post("/login", ({ body: { username, password }, status }) => {
    if (username === "admin" && password === "admin") {
      return { token: "lol" };
    }
    return status(400, { error: "Invalid" });
  }, {
    body: "credentials",
    response: {
      200: "token",
      400: "error"
    }
  })
  .post("/register", ({ body: { username, password }, status }) => {
    if (username && password) {
      return { message: "User registered" };
    }
    return status(400, { error: "Invalid" });
  }, {
    body: "credentials",
    response: {
      200: "message",
      400: "error",
    }
  })
  .guard({
    response: {
      400: "error",
      401: "error",
    },
    detail: {
      security: [{ bearer: [] }],
    },
  })
  .post("/logout", () => {
    return { message: "Logged out" };
  }, {
    response: {
      200: "message",
    },
  });
