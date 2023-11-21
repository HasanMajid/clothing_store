const express = require("express");
const runQuery = require("../db")
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM employee");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO employee VALUES ('usr1', '16', 'Store1', 'cashier') INTO employee VALUES ('usr2', '25', 'Store2', 'manager') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM employee");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;