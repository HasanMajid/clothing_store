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

// app.get("/", async (req, res) => {
//   const user = await runQuery("SELECT * FROM usr");
//   res.send(user[0]);
// });

app.get("/getUsers", async (req, res) => {
  const users = await runQuery("SELECT * FROM usr");
  res.send(users);
});

app.get("/populate", async (req, res) => {
  const response = await runQuery(
    "INSERT ALL INTO usr VALUES ('usr1', 'employee', 'John', 'David', 'john@example.com', '123-456-7890', '03161970') INTO usr VALUES ('usr2', 'employee', 'James', 'Poe', 'james@example.com', '987-654-3210', '01141997') INTO usr VALUES ('usr3', 'customer', 'Kevin', 'Kim', 'Kevin@example.com', '123-446-8888', '04061991') INTO usr VALUES ('usr4', 'customer', 'Brian', 'Pham', 'Brian@example.com', '987-612-3420', '12141984') INTO usr VALUES ('usr5', 'admin', 'Victoria', 'Lee', 'Victoria@example.com', '123-152-8312', '10161999') INTO usr VALUES ('usr6', 'admin', 'Joseph', 'Smith', 'Joseph@example.com', '987-651-1527', '12032001') SELECT 1 FROM DUAL"
  );
  res.send(response);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
