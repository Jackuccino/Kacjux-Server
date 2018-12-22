const express = require("express");
const router = express.Router();

// Handle a GET request which will return all the existing items
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Items were fetched"
  });
});

// Handle a POST request which will create a new item
router.post("/", (req, res, next) => {
    const item = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type
    }

  res.status(201).json({
    message: "Item was created",
    createdItem: item
  });
});

// Handle a GET request which will return the specific item
router.get("/:itemId", (req, res, next) => {
  const id = req.params.itemId;
  res.status(200).json({
    message: "Item details",
    id: id
  });
});

// Handle a PATCH request which will update the specific item
router.patch("/:itemId", (req, res, next) => {
  res.status(200).json({
    message: "Item was updated"
  });
});

// Handle a DELETE request which will delete the specific item
router.delete("/:itemId", (req, res, next) => {
  res.status(200).json({
    message: "Item was deleted"
  });
});

module.exports = router;
