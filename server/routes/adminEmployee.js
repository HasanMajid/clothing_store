const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM adminEmployee");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO adminEmployee VALUES ('usr5', 'Birth town', 'Toronto', '1') INTO adminEmployee VALUES ('usr6', 'First pets name', 'Max', '3') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM adminEmployee");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
