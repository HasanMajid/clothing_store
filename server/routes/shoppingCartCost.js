const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM shoppingCartCost");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery("");
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM shoppingCartCost");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
