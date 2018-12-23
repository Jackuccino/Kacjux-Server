const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orderController');

// Handle a GET request which will return all the existing orders
router.get('/', OrdersController.orders_get_all);

// Handle a POST request which will create a new order
router.post('/', OrdersController.orders_create);

// Handle a GET request which will get the specific order
router.get('/:orderId', OrdersController.orders_get);

// Handle a PATCH request which will update the specific order
router.patch('/:orderId', OrdersController.orders_update);

// Handle a DELETE request which will delete the specific order
router.delete('/:orderId', OrdersController.orders_delete);

module.exports = router;
