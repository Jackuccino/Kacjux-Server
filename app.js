const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const orderRoutes = require("./api/routes/orders");
const itemRoutes = require("./api/routes/items");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use REST routers
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);

// Error handling for invalid requests
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error handling message for all errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
