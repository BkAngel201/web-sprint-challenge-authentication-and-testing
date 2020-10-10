const server = require("./server");
const request = require("supertest");

describe("auth-router.js File", () => {
  test("Inside testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("POST /api/auth/register", () => {
    test("should return 201, response json format, and the object returned is correct", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "alex", password: "mike00" });
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
      expect(res.body).toHaveProperty("username");
      expect(res.body).toHaveProperty("password");
    });
  });

  describe("POST /api/auth/login", () => {
    test("should return 200, response json format, and the object returned is correct", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "alex", password: "mike00" });
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("token");
    });
  });

  describe("GET /api/jokes/", () => {
    test("Should not let the user pass", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("invalid or missing credentials");
    });

    test("should access the end point and return jokes", async () => {
      const res = await request(server)
        .get("/api/jokes")
        .set(
          "authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE2MDIyOTg0NjYsImV4cCI6MTYwMjQ3MTI2Nn0._uhqTSXbTZEgdIzZymTYzk1bXrtFaw8JrMcvdOqv54E"
        );
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
