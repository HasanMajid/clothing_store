const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM shoppingCart");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery("INSERT ALL INTO shoppingCart VALUES ('usr3', 'Product1', 2) INTO shoppingCart VALUES ('usr3', 'Product2', 1) INTO shoppingCart VALUES ('usr3', 'Product3', 3) INTO shoppingCart VALUES ('usr4', 'Product1', 1) INTO shoppingCart VALUES ('usr4', 'Product4', 2) SELECT 1 FROM DUAL");
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM shoppingCart");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
