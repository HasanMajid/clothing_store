const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const query = req.query.q;
  const records = await runQuery(query);
  res.send(records);
});



module.exports = router;
