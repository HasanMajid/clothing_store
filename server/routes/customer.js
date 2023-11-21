const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM customer");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO customer VALUES ('usr3', 'White Sweater', '2000', '4 shirts') INTO customer VALUES ('usr4', 'Black Jeans', '12400', '6 shirts') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM customer");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
