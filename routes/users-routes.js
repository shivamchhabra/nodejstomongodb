const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/user-controllers");
//const { check } = require("express-validator");

router.get("/", usersControllers.getuserslist);

router.post("/signup", usersControllers.createuser);

router.post("/login", usersControllers.loginuser);

module.exports = router;
