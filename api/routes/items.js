const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// Handle a GET request which will return all the existing items
router.get('/', ItemController.items_get_all);

// Handle a POST request which will create a new item
router.post('/', ItemController.items_create);

// Handle a GET request which will get the specific item
router.get('/:itemId', ItemController.items_get);

// Handle a PATCH request which will update the specific item
router.patch('/:itemId', ItemController.items_update);

// Handle a DELETE request which will delete the specific item
router.delete('/:itemId', ItemController.items_delete);

module.exports = router;
