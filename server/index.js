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
    const data = await connection.execute(query, [], { autoCommit: true });
    console.log(data.rows);
    return data.rows;
  } catch (err) {
    console.log('errror')
    // console.error(err);
    return [];
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

app.get("/populateUsers", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO usr VALUES ('usr1', 'employee', 'John', 'David', 'john@example.com', '123-456-7890', '03161970') INTO usr VALUES ('usr2', 'employee', 'James', 'Poe', 'james@example.com', '987-654-3210', '01141997') INTO usr VALUES ('usr3', 'customer', 'Kevin', 'Kim', 'Kevin@example.com', '123-446-8888', '04061991') INTO usr VALUES ('usr4', 'customer', 'Brian', 'Pham', 'Brian@example.com', '987-612-3420', '12141984') INTO usr VALUES ('usr5', 'admin', 'Victoria', 'Lee', 'Victoria@example.com', '123-152-8312', '10161999') INTO usr VALUES ('usr6', 'admin', 'Joseph', 'Smith', 'Joseph@example.com', '987-651-1527', '12032001') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

app.get("/deleteUsers", async (req, res) => {
  await runQuery("DELETE FROM usr");
  res.send([{ message: "deleted users" }]);
});

app.get("/createTables", async (req, res) => {
  await runQuery(
    "CREATE TABLE usr(userID VARCHAR2(20) PRIMARY KEY, userType VARCHAR2(10), firstName VARCHAR2(25), lastName VARCHAR2(25), email VARCHAR2(50), phoneNumber VARCHAR2(12), dateOfBirth VARCHAR2(10))"
  );
  await runQuery(
    "CREATE TABLE physicalStore(storeID VARCHAR2(20) PRIMARY KEY, loc VARCHAR2(100), email VARCHAR2(320), hrs VARCHAR2(80), phoneNumber VARCHAR2(12))"
  );
  await runQuery(
    "CREATE TABLE employee(empID VARCHAR2(20), wage NUMBER, storeID VARCHAR2(20),  storeRole VARCHAR2(20), PRIMARY KEY(empID), FOREIGN KEY (empID) REFERENCES usr(userID) ON DELETE CASCADE, FOREIGN KEY (storeID) REFERENCES physicalStore(storeID) ON DELETE CASCADE)"
  );
  await runQuery(
    "CREATE TABLE customer(custID VARCHAR(20), wishlist VARCHAR2(20), points NUMBER, orderHistory VARCHAR2(20), PRIMARY KEY(custID), FOREIGN KEY (custID) REFERENCES usr(userID) ON DELETE CASCADE)"
  );
  await runQuery(
    "CREATE TABLE adminEmployee(adminID VARCHAR2(20), securityQuestion VARCHAR2(20), securityAnswer VARCHAR2(20), securityLevel NUMBER, PRIMARY KEY(adminID), FOREIGN KEY (adminID) REFERENCES usr(userID) ON DELETE CASCADE)"
  );
  await runQuery(
    "CREATE TABLE brand(brandName VARCHAR2(25) PRIMARY KEY,  email VARCHAR2(25), phoneNumber VARCHAR2(12))"
  );
  await runQuery(
    "CREATE TABLE product(prodId VARCHAR(25) PRIMARY KEY, price NUMBER, cat VARCHAR2(15), stock NUMBER, color VARCHAR2(10), clotheSize VARCHAR2(8), images VARCHAR2(26), descrip VARCHAR2(500), productName VARCHAR2(25))"
  );
  await runQuery(
    "CREATE TABLE shoppingCartQuantity(customerID VARCHAR2(20) REFERENCES customer(custID) ON DELETE CASCADE, productID VARCHAR2(25) REFERENCES product(prodId) ON DELETE CASCADE, quantity NUMBER, PRIMARY KEY(customerID, productID))"
  );
  await runQuery(
    "CREATE TABLE shoppingCartCost(customerID VARCHAR2(20), productID VARCHAR2(25), quantity NUMBER, subtotal NUMBER, total NUMBER, PRIMARY KEY(customerID, productID), FOREIGN KEY (customerID, productID) REFERENCES shoppingCartQuantity(customerID, productID) ON DELETE CASCADE)"
  );
  await runQuery(
    "CREATE TABLE supplier(supName VARCHAR2(20) PRIMARY KEY, loc VARCHAR2(100), email VARCHAR2(320), phoneNumber VARCHAR2(12))"
  );
  res.send([{ message: "created tables" }]);
});

app.get("/dropTables", async (req, res) => {
  await runQuery("drop table employee");
  await runQuery("drop table shoppingCartCost");
  await runQuery("drop table shoppingCartQuantity");
  await runQuery("drop table adminEmployee");
  await runQuery("drop table customer");
  await runQuery("drop table usr");
  await runQuery("drop table brand");
  await runQuery("drop table product");
  await runQuery("drop table supplier");
  res.send([{ message: "deleted tables" }]);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
