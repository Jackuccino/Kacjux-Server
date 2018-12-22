const { Pool } = require("pg");
const express = require("express");
const router = express.Router();

// Config for postgre
const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PORT || 3000,
  max: 10,
  idleTimeoutMillis: 30000
};

// Create the new pool for postgre
const pool = new Pool(config);

// Handle a GET request which will return all the existing orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders were fetched"
  });
});

// Handle a POST request which will create a new order
router.post("/", (req, res, next) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      console.log("database connected");
      // Do query stuff
      const sql =
        "INSERT INTO orders (TotalPrice, OrderItems, Closed, Note) VALUES ($1, $2, $3, $4)";
      const params = [
        req.body.totalPrice,
        req.body.orderItems.join(","),
        req.body.closed,
        req.body.note
      ];
      return client.query(sql, params);
    })
    .then(result => {
      console.log("Result", result);
    })
    .catch(err => {
      console.log("Error", err);
    });

  res.status(201).json({
    message: "Order was created"
  });
});

// Handle a GET request which will get the specific order
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: "Order details",
    id: id
  });
});

// Handle a PATCH request which will update the specific order
router.patch("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order was updated"
  });
});

// Handle a DELETE request which will delete the specific order
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order was deleted"
  });
});

module.exports = router;
