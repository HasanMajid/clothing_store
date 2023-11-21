const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM supplier");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO supplier VALUES ('Supplier1', '123 Main Street, City1', 'supplier1@example.com', '123-456-7890') INTO supplier VALUES ('Supplier2', '456 Elm Street, City2', 'supplier2@example.com', '987-654-3210') INTO supplier VALUES ('Supplier3', '789 Oak Street, City3', 'supplier3@example.com', '555-123-4567') INTO supplier VALUES ('Supplier4', '321 Maple Street, City4', 'supplier4@example.com', '777-888-9999') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM supplier");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
