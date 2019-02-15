const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/orderController");

// Handle a GET request which will return all the existing orders
router.get("/", OrdersController.orders_get_all);

// Handle a POST request which will create a new order
router.post("/", OrdersController.orders_create);

// Handle a GET request which will get the specific order
router.get("/:orderId", OrdersController.orders_get);

// Handle a PATCH request which will close the specific order
router.patch("/close-order/:orderId", OrdersController.orders_close);

// Handle a PATCH request which will change the specific order's quantity
router.patch(
  "/change-quantity/:orderId",
  OrdersController.orders_change_quantity
);

// Handle a DELETE request which will delete the specific order
router.delete("/delete-order/:orderId", OrdersController.orders_delete);

// Handle a DELETE request which will delete the specific items in specific order
router.delete("/remove-item/:orderId", OrdersController.orders_delete_item);

module.exports = router;
