const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM brand");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO brand VALUES ('Brand1', 'brand1@example.com', '123-456-7890') INTO brand VALUES ('Brand2', 'brand2@example.com', '987-654-3210') INTO brand VALUES ('Brand3', 'brand3@example.com', '555-123-4567') INTO brand VALUES ('Brand4', 'brand4@example.com', '777-888-9999') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM brand");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
