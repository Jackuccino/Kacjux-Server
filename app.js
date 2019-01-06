const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const orderRoutes = require("./api/routes/orders");
const itemRoutes = require("./api/routes/items");

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Use REST routers
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);

// Error handling for invalid requests
app.use((req, res, next) => {
  const err = new Error("Request Not found");
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
