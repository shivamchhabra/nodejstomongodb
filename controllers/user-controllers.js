//const uuid = require("uuid");
const httperror = require("../models/httperror");
//const { validationResult } = require("express-validator");
const User = require("../models/userSchema");
//
//
//
//

///////////////////////////get users list
const getuserslist = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "email name");
  } catch (error) {
    next(new httperror("something went wrong please try later", 500));
  }

  if (users) {
    return res.status(200).json({ users: users.map(p => p.toObject()) });
  }
};
//
//
//
//

// /////////////////////////create users
const createuser = async (req, res, next) => {
  /* const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new httperror("invalid inputs", 422);
  }*/

  const { name, email, password, image, places } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    next(new httperror("something went wrong", 500));
  }

  if (existingUser) {
    return next(new httperror("User already exists", 500));
  }
  const newuser = new User({
    //this is a constructor  function
    name,
    email,
    password,
    image,
    places: []
  });
  console.log(newuser);
  try {
    await newuser.save();
  } catch (error) {
    console.log(error);
    next(new httperror("cannot save new user", 500));
  }
  res.status(200).json({ newuser });
};
//
//
//
//
/////////////////login
const loginuser = async (req, res, next) => {
  const { email, password } = req.body;
  let userExists;
  try {
    userExists = await User.findOne({ email: email });
  } catch (error) {
    next(new httperror("something went wrong", 500));
  }

  if (!userExists) {
    next(new httperror("user doesnot exists", 500));
  }
  const login = false;
  if (userExists.password === password) {
    return res.status(200).json({ message: "logged in" });
  } else {
    return res.status(200).json({ message: "invalid password" });
  }
};

exports.getuserslist = getuserslist;
exports.createuser = createuser;
exports.loginuser = loginuser;
