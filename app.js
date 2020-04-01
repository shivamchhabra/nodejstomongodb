const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const placesRouter = require("./routes/places-routes");
const usersRouter = require("./routes/users-routes");
const httperror = require("./models/httperror");

app.use(bodyParser.json());

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new httperror("Donot have such route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  /*if (res.headerSent) {
      return next(error);
    }*/
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://shivamchhabra:shivam123@cluster0-l3wmr.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connection established to database");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
