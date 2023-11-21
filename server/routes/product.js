const express = require("express");
const runQuery = require("../db");
const router = express.Router();

router.get("/get", async (req, res) => {
  const users = await runQuery("SELECT * FROM product");
  res.send(users);
});

router.get("/populate", async (req, res) => {
  console.log("populating table");
  await runQuery(
    "INSERT ALL INTO product VALUES ('P1001', 29.99, 'Shoes', 50, 'Black', 'Small', 'product1.jpg', 'High-quality fabric product.', 'Electronics Product 1') INTO product VALUES ('P1002', 19.99, 'T-shirts', 100, 'Blue', 'Medium', 'product2.jpg', 'Comfortable medium-sized blue t-shirt.', 'Blue T-Shirt') INTO product VALUES ('P1003', 49.99, 'T-shirts', 30, 'Silver', 'Small', 'product3.jpg', 'Modern small-sized silver t-shirt.', 'Silver Gadget') INTO product VALUES ('P1004', 39.99, 'Pants', 75, 'Red', 'Large', 'product4.jpg', 'Stylish and vibrant red dress for special occasions.', 'Red Dress') SELECT 1 FROM DUAL"
  );
  res.send([{ message: "populated table" }]);
});

router.get("/delete", async (req, res) => {
  await runQuery("DELETE FROM product");
  res.send([{ message: "deleted data" }]);
});

module.exports = router;
