const Auth = require("./authModel");
const db = require("../database/dbConfig");
const authModel = require("./authModel");

describe("Auth model file (authModel.js)", () => {
  describe("insert() Function", () => {
    test("insert will add a record into the DB", async () => {
      await Auth.insert({ username: "angel", password: "123" });
      await Auth.insert({ username: "michel", password: "321" });
      await Auth.insert({ username: "jorge", password: "213" });

      const users = await db("users");
      expect(users).toHaveLength(3);
    });

    beforeEach(async () => {
      await db("users").truncate();
    });

    test("return the values that was inserted", async () => {
      let newUser = await Auth.insert({ username: "ana", password: "312" });

      expect(newUser.username).toBe("ana");
    });
  });

  describe("findById() Function", () => {
    test("return the correct record", async () => {
      const user = await Auth.findById(1);
      expect(user.username).toBe("ana");
    });
  });

  describe("findBy() Function", () => {
    test("return the correct record", async () => {
      const user = await Auth.findBy({ username: "ana" });

      expect(user).toHaveLength(1);
      expect(user[0].password).toBe("312");
    });
  });
});
