var express = require("express");
var router = express.Router();
var path = require("path");

// Deklarera mongoose
// deklarera route ./models/productsModel.js
var mongoose = require("mongoose");
var productsModel = require("../models/productsModel.js");

/* GET CARS listing FROM DATABASE. */

/*
GAMLA SÄTTET
router.get("/", function (req, res, next) {
  //"find" är Mongoose funktion. err innehåller eventuellt fel, annars kommer resultatet att finnas i “cars”
  carsModel.find(function (err, cars) {
    if (err) return next(err);
    else {
      // OM det inte uppstår fel så svara med cars i JSON-format
      res.json(cars);
    }
  });
});
*/

// NYA SÄTTET MED async/await
/*
router.get("/", async function(req, res, next){
  // AWAIT för att invänta svar på find()
  try {
    const cars = await carsModel.find();

    // svar i JSON
    res.json(cars);
  } catch (error) {
    // Om fel - kasta in error i next()
    next(error);
  }
});
*/

// ANDRA sättet med .then()

// GET-REQUEST till databas

router.get("/", function (req, res, next) {
  // promise-syntax - .then()
  productsModel
    .find()
    .then(function (products) {
      // svar i JSON
      res.json(products);
    })
    .catch(function (err) {
      //Om fel-
      next(err);
    });
});

// POST-request till databas

router.post("/", function (req, res, next) {
  // promise-syntax
  productsModel
    .create(req.body)
    .then(function (post) {
      //Skickar tillbaka datan som skickas IN i databasen - om det går bra.
      res.json(post);
    })
    .catch(function (err) {
      // Om fel -
      next(err);
    });
});

// DELETE-request till databas
// Ex. med Postman - delete-request med url localhost:3000/65a67926100de3ec69660c7b - (id)
// url = "/:id" för att peka på unika id:t - Express
router.delete("/:id", function (req, res, next) {
  // kör findByIdAndDelete-metod på productsModel
  productsModel
    .findByIdAndDelete(req.params.id, req.body)
    .then(function (post) {
      res.json(post);
    })
    .catch(function (err) {
      next(err);
    });
});

// UPDATE-Request till databas
//https://coursework.vschool.io/mongoose-crud/

router.put("/:id", function (req, res, next) {
  //const carId = req.params.id;
  //const carBody = req.body;

  //const test = { reg: "111111", color: "111111", brand: "111111", model: "111111" };
  console.log(req.body);

  productsModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function (updatedProduct) {
      res.json(updatedProduct);
      console.log("BODY", req.body);
      console.log("UPDATERAD BIL", updatedProduct);
    })
    .catch(function (err) {
      next(err);
    });
});

module.exports = router;
