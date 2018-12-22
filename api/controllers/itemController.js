const { Pool } = require("pg");

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

exports.items_get_all = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql = "SELECT * FROM Items;";
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

exports.items_create = (req, res, next) => {
  pool
    .connect()
    .then(client => {
      const sql =
        "INSERT INTO Items (Name, Description, Price, Type) VALUES ($1, $2, $3, $4);";
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

exports.items_get = (req, res, next) => {
  const id = req.params.itemId;
  pool
    .connect()
    .then(client => {
      const sql = "SELECT * FROM Items WHERE ItemId = $1;";
      const params = [id];
      return client
        .query(sql, params)
        .then(result => {
          client.release();
          console.log(result);
          if (!result) {
            return res.status(404).json({ message: "Item not found" });
          }
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

exports.items_update = (req, res, next) => {
  const id = req.params.itemId;
  pool
    .connect()
    .then(client => {
      const sql =
        "UPDATE Items SET Name = $1, Description = $2, Price = $3, Type = $4 WHERE ItemId = $5;";
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

exports.items_delete = (req, res, next) => {
  const id = res.params.itemId;
  pool
    .connect()
    .then(client => {
      const sql = "DELETE FROM Items WHERE ItemId = $1;";
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
