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
      const sql = 'CALL "Kacjux".Get_All_Orders();';
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
                  Date: order.Date
                },
                request: {
                  type: "GET",
                  url: `http://${process.env.PGHOST}:8080/api/orders/${
                    order.OrderId
                  }`
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
      const sql =
        'INSERT INTO "Kacjux"."Orders" ("OrderNo", "TotalPrice", "OrderItem", "Quantity", "Note") VALUES ($1, $2, $3, $4, $5);';
      const params = [
        req.body.OrderNo,
        req.body.TotalPrice,
        req.body.OrderItem,
        req.body.Quantity,
        req.body.Note
      ];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(201).json({
            result: "ok",
            message: "Created order successfully",
            request: {
              type: "GET",
              description: "Get all orders",
              url: `http://${process.env.PGHOST}:8080/api/orders/`
            }
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
      const sql = 'SELECT * FROM "Kacjux"."Orders" WHERE "OrderId" = $1;';
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
            order: result.rows[0],
            request: {
              type: "DELETE",
              url: `http://${process.env.PGHOST}:8080/api/orders/${id}`
            }
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

exports.orders_update = (req, res, next) => {
  const id = req.params.orderId;
  pool
    .connect()
    .then(client => {
      const sql = "CALL Close_Order($1, $2);";
      const params = [req.body.Closed, id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Order updated",
            request: {
              type: "GET",
              url: `http://${process.env.PGHOST}:8080/api/orders/${id}`
            }
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
      const sql = 'DELETE FROM "Kacjux"."Orders" WHERE "OrderId" = $1;';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Order deleted",
            request: {
              type: "POST",
              url: `http://${process.env.PGHOST}:8080/api/orders/`,
              body: {
                OrderNo: "OrderNo",
                TotalPrice: "TotalPrice",
                OrderItem: "OrderItem",
                Quantity: "Quantity",
                Note: "Note"
              }
            }
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
