const { Pool } = require("pg");

// Config for postgre
const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  max: 10,
  idleTimeoutMillis: 30000
};

// Create the new pool for postgre
const pool = new Pool(config);

exports.orders_get_all = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql = 'SELECT * FROM "Kacjux"."Get_All_Orders"();';
      const params = [];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          const response = {
            count: result.rowCount,
            orders: result.rows.map(order => {
              return {
                result: "ok",
                order: {
                  OrderId: order.OrderId,
                  OrderNo: order.OrderNo,
                  TotalPrice: order.TotalPrice,
                  OrderItem: order.OrderItem,
                  Quantity: order.Quantity,
                  Closed: order.Closed,
                  Note: order.Note,
                  TableNum: order.TableNum,
                  Date: order.Date
                }
              };
            })
          };
          res.status(200).json(response);
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
      const sql = 'CALL "Kacjux"."Insert_Order"($1, $2, $3, $4, $5, $6);';
      const params = [
        req.body.OrderNo,
        req.body.TotalPrice,
        req.body.OrderItem,
        req.body.Quantity,
        req.body.Note,
        req.body.TableNum
      ];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(201).json({
            result: "ok",
            message: "Created order successfully"
          });
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
      const sql = 'SELECT * FROM "Kacjux"."Get_Order"($1);';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          if (!result.rowCount) {
            return res.status(404).json({
              message: "Order not found"
            });
          }
          res.status(200).json({
            result: "ok",
            order: result.rows[0]
          });
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

exports.orders_close = (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = 'CALL "Kacjux"."Close_Order"($1, $2);';
      const params = [id, true];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Order updated"
          });
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

exports.orders_change_quantity = (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = 'CALL "Kacjux"."Reduce_Quantity"($1, $2, $3);';
      const params = [id, req.body.Quantity, req.body.OrderItem];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Order updated"
          });
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
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = 'CALL "Kacjux"."Delete_Order"($1);';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Order deleted"
          });
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

exports.orders_delete_item = (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = 'CALL "Kacjux"."Delete_Items_In_Order"($1, $2);';
      const params = [id, req.body.OrderItem];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Item deleted from order"
          });
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
