const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const runQuery = require("./db.js");
const userRoutes = require("./routes/user.js");
const employeeRoutes = require("./routes/employee.js");
const physicalStoreRoutes = require("./routes/physicalStore.js");
const supplierRoutes = require("./routes/supplier.js");
const customerRoutes = require("./routes/customer.js");
const productRoutes = require("./routes/product.js");
const adminEmployeeRoutes = require("./routes/adminEmployee.js");
const brandRoutes = require("./routes/brand.js");
const shoppingCartRoutes = require("./routes/shoppingCart.js");
const customQueryRoutes = require("./routes/customQuery.js");

const corsOption = {
  origin: [process.env.URL],
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOption));
//if you want in every domain then
app.use(cors());

// app.get("/", async (req, res) => {
//   const user = await runQuery("SELECT * FROM usr");
//   res.send(user[0]);
// });

app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);
app.use("/physicalStore", physicalStoreRoutes);
app.use("/supplier", supplierRoutes);
app.use("/customer", customerRoutes);
app.use("/product", productRoutes);
app.use("/adminEmployee", adminEmployeeRoutes);
app.use("/brand", brandRoutes);
app.use("/shoppingCart", shoppingCartRoutes);
app.use("/customQuery", customQueryRoutes);

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
    "CREATE TABLE shoppingCart(customerID VARCHAR2(20), productID VARCHAR2(25), quantity NUMBER, PRIMARY KEY(customerID, productID), FOREIGN KEY (customerID) REFERENCES customer(custID) ON DELETE CASCADE, FOREIGN KEY (productID) REFERENCES product(prodID) ON DELETE CASCADE)"
  );
  await runQuery(
    "CREATE TABLE supplier(supName VARCHAR2(20) PRIMARY KEY, loc VARCHAR2(100), email VARCHAR2(320), phoneNumber VARCHAR2(12))"
  );
  res.send([{ message: "created tables" }]);
});

app.get("/dropTables", async (req, res) => {
  await runQuery("drop table employee");
  await runQuery("drop table shoppingCart");
  await runQuery("drop table adminEmployee");
  await runQuery("drop table customer");
  await runQuery("drop table usr");
  await runQuery("drop table brand");
  await runQuery("drop table product");
  await runQuery("drop table physicalStore");
  await runQuery("drop table supplier");
  res.send([{ message: "deleted tables" }]);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
