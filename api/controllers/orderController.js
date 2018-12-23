const { Pool } = require('pg');

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

exports.orders_get_all = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql = 'SELECT * FROM "Orders";';
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
};

exports.orders_create = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql =
        'INSERT INTO "Orders" ("TotalPrice", "OrderItem", "Note") VALUES ($1, $2, $3);';
      const params = [
        req.body.TotalPrice,
        req.body.OrderItem,
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
};

exports.orders_get = (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = 'SELECT * FROM "Orders" WHERE "OrderId" = $1;';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: 'Order not found' });
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
};

exports.orders_update = (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql =
        'UPDATE "Orders" SET "TotalPrice" = $1, "OrderItems" = $2, "Closed" = $3, "Note" = $4 WHERE "OrderId" = $5;';
      const params = [
        req.body.TotalPrice,
        req.body.OrderItems.join(','),
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
};

exports.orders_delete = (req, res, next) => {
  const id = res.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = 'DELETE FROM "Orders" WHERE "OrderId" = $1;';
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
};
