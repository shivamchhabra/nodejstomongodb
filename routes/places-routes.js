const express = require("express");

const router = express.Router();
const httperror = require("../models/httperror");
const placescontroller = require("../controllers/places-controllers");

router.get("/:pid", placescontroller.getplacebyid);

router.post("/", placescontroller.createplace);

router.patch("/:pid", placescontroller.updateplaces);

router.delete("/:pid", placescontroller.deleteplace);

router.get("/getplacebyuserid/:userid", placescontroller.getplacebyUserId);

module.exports = router;
//{"_id":{"$oid":""},"title":"Taj Mahal","description":"worlds best monument","location":{"lat":{"$numberDouble":"27.1751"},"lng":{"$numberDouble":"78.0421"}},"creator":"p2","address":"AGRA, INDIA","image":"https://unsplash.com/photos/_WuPjE-MPHo","__v":{"$numberInt":"0"}}
//5e83196070bf54338c787274
//{"_id":{"$oid":"5e83401e5c7a4020303f8945"},"name":"shivam","email":"shivamchhabra1@gmail.com","password":"1234567","image":"myImage.jpg","places":"tajmahal","__v":{"$numberInt":"0"}}
//5e83401e5c7a4020303f8945
