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

exports.items_get_all = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql = 'SELECT * FROM "Items";';
      const params = [];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          const response = {
            result: "ok",
            count: result.rowCount,
            items: result.rows.map(item => {
              return {
                ItemId: item.ItemId,
                Name: item.Name,
                Description: item.Description,
                Price: item.Price,
                Type: item.Type,
                request: {
                  type: "GET",
                  url: `http://localhost:${process.env.PORT}/api/items/${
                    item.ItemId
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

exports.items_create = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql =
        'INSERT INTO "Items" ("Name", "Description", "Price", "Type") VALUES ($1, $2, $3, $4);';
      const params = [
        req.body.Name,
        req.body.Description,
        req.body.Price,
        req.body.Type
      ];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          if (result.rowCount) {
            res.status(201).json({
              result: "ok",
              message: "Created item successfully",
              request: {
                type: "GET",
                description: "Get all items",
                url: `http://localhost:${process.env.PORT}/api/items/`
              }
            });
          } else {
            res.status(500).json({ error: "Creating item failed" });
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

exports.items_get = (req, res, next) => {
  const id = req.params.itemId;
  pool
    .connect()
    .then(client => {
      const sql = 'SELECT * FROM "Items" WHERE "ItemId" = $1;';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          if (!result.rowCount) {
            return res.status(404).json({ message: "Item not found" });
          }
          res.status(200).json({
            result: "ok",
            item: {
              ItemId: result.rows[0].ItemId,
              Name: result.rows[0].Name,
              Description: result.rows[0].Description,
              Price: result.rows[0].Price,
              Type: result.rows[0].Type
            },
            request: {
              type: "DELETE",
              url: `http://localhost:${process.env.PORT}/api/items/${id}`
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

exports.items_update = (req, res, next) => {
  const id = req.params.itemId;
  pool
    .connect()
    .then(client => {
      const sql =
        'UPDATE "Items" SET "Name" = $1, "Description" = $2, "Price" = $3, "Type" = $4 WHERE "ItemId" = $5;';
      const params = [
        req.body.Name,
        req.body.Description,
        req.body.Price,
        req.body.Type,
        id
      ];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Item updated",
            request: {
              type: "GET",
              url: `http://localhost:${process.env.PORT}/api/items/${id}`
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

exports.items_delete = (req, res, next) => {
  const id = req.params.itemId;
  pool
    .connect()
    .then(client => {
      const sql = 'DELETE FROM "Items" WHERE "ItemId" = $1;';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          res.status(200).json({
            result: "ok",
            message: "Item deleted",
            request: {
              type: "POST",
              url: `http://localhost:${process.env.PORT}/api/items/`,
              body: {
                Name: "Name",
                Description: "Description",
                Price: "Price",
                Type: "Type"
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
