const db = require("../database/dbConfig");

module.exports = {
  insert,
  findBy,
  findById,
};

function findById(id) {
  return db("users").where({ id }).first();
}

async function insert(userData) {
  const [id] = await db("users").insert(userData, "id");
  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
