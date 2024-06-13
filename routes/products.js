// routes/products.js
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var productsModel = require("../models/productsModel.js");

// GET-REQUEST till databas
router.get("/", function (req, res, next) {
  productsModel
    .find()
    .then(function (products) {
      res.json(products);
    })
    .catch(function (err) {
      next(err);
    });
});

// POST-request till databas
router.post("/", function (req, res, next) {
  productsModel
    .create(req.body)
    .then(function (post) {
      res.json(post);
    })
    .catch(function (err) {
      next(err);
    });
});

// DELETE-request till databas
router.delete("/:id", function (req, res, next) {
  productsModel
    .findByIdAndDelete(req.params.id, req.body)
    .then(function (post) {
      res.json(post);
    })
    .catch(function (err) {
      next(err);
    });
});

// UPDATE-request till databas
router.put("/:id", function (req, res, next) {
  productsModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function (updatedProduct) {
      res.json(updatedProduct);
    })
    .catch(function (err) {
      next(err);
    });
});

module.exports = router;
