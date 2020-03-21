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
      const sql = 'SELECT * FROM "Kacjux"."Get_All_Items"();';
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
                Key: item.Key,
                Description: item.Description,
                Image: item.Image,
                Price: item.Price,
                Type: item.Type
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
      const sql = 'CALL "Kacjux"."Insert_Item"($1, $2, $3, $4, $5);';
      const params = [
        req.body.Key,
        req.body.Description,
        req.body.Image,
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
              message: "Created item successfully"
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
      const sql = 'CALL "Kacjux"."Get_Item"($1);';
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
              Key: result.rows[0].Key,
              Description: result.rows[0].Description,
              Image: result.rows[0].Image,
              Price: result.rows[0].Price,
              Type: result.rows[0].Type
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
      const sql = 'CALL "Kacjux"."Update_Item"($1, $2, $3, $4, $5, $6);';
      const params = [
        req.body.Key,
        req.body.Description,
        req.body.Image,
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
            message: "Item updated"
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
      const sql = 'CALL "Kacjux"."Delete_Item"($1);';
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          res.status(200).json({
            result: "ok",
            message: "Item deleted"
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
