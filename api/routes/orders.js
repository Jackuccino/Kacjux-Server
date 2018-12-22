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
  pool
    .connect()
    .then(client => {
      const sql = "SELECT * FROM orders;";
      const params = [];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          client.release();
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Handle a POST request which will create a new order
router.post("/", (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql =
        "INSERT INTO orders (TotalPrice, OrderItems, Closed, Note) VALUES ($1, $2, $3, $4);";
      const params = [
        req.body.TotalPrice,
        req.body.OrderItems.join(","),
        req.body.Closed,
        req.body.Note
      ];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          res.status(201).json(result);
        })
        .catch(err => {
          client.release();
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Handle a GET request which will get the specific order
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = "SELECT * FROM orders WHERE OrderId = $1;";
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: "Not a valid ID" });
          }
        })
        .catch(err => {
          client.release();
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Handle a PATCH request which will update the specific order
router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql =
        "UPDATE orders SET TotalPrice = $1, OrderItems = $2, Closed = $3, Note = $4 WHERE OrderId = $5;";
      const params = [
        req.body.TotalPrice,
        req.body.OrderItems.join(","),
        req.body.Closed,
        req.body.Note,
        id
      ];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          client.release();
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Handle a DELETE request which will delete the specific order
router.delete("/:orderId", (req, res, next) => {
  const id = res.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = "DELETE FROM orders WHERE OrderId = $1;";
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          client.release();
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
