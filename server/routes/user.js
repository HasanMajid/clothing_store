const express = require("express");
const runQuery = require("../db")
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM usr");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO usr VALUES ('usr1', 'employee', 'John', 'David', 'john@example.com', '123-456-7890', '03161970') INTO usr VALUES ('usr2', 'employee', 'James', 'Poe', 'james@example.com', '987-654-3210', '01141997') INTO usr VALUES ('usr3', 'customer', 'Kevin', 'Kim', 'Kevin@example.com', '123-446-8888', '04061991') INTO usr VALUES ('usr4', 'customer', 'Brian', 'Pham', 'Brian@example.com', '987-612-3420', '12141984') INTO usr VALUES ('usr5', 'admin', 'Victoria', 'Lee', 'Victoria@example.com', '123-152-8312', '10161999') INTO usr VALUES ('usr6', 'admin', 'Joseph', 'Smith', 'Joseph@example.com', '987-651-1527', '12032001') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM usr");
  res.send([{ message: "deleted users" }]);
});

module.exports = router;