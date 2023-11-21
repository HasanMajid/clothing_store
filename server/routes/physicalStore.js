const express = require("express");
const runQuery = require("../db")
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM physicalStore");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO physicalStore VALUES ('Store1', '123 Main Street, City1', 'store1@example.com', '9:00 AM - 6:00 PM', '123-456-7890') INTO physicalStore VALUES ('Store2', '456 Elm Street, City2', 'store2@example.com', '10:00 AM - 7:00 PM', '987-654-3210') INTO physicalStore VALUES ('Store3', '789 Oak Street, City3', 'store3@example.com', '8:30 AM - 5:30 PM', '555-123-4567') INTO physicalStore VALUES ('Store4', '321 Maple Street, City4', 'store4@example.com', '9:00 AM - 6:00 PM', '777-888-9999') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM physicalStore");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;