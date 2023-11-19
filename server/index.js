const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const corsOption = {
  origin: [process.env.URL],
};

const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.initOracleClient();

async function runQuery(query) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      connectionString: process.env.CONNECTIONSTRING,
    });
    console.log("Successfully connected to Oracle Database"); // Create a table
    const data = await connection.execute(query);
    console.log(data.rows);
    return data.rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOption));
//if you want in every domain then
app.use(cors());

app.get("/", async (req, res) => {
  const user = await runQuery("SELECT * FROM usr");
  res.send(user[0]);
});

app.get("/getUser", async (req, res) => {
  const user = await runQuery("SELECT * FROM usr");
  res.send(user[0]);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
