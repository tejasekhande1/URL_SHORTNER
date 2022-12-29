/* eslint-disable turbo/no-undeclared-env-vars */
// allowing env variables
require("dotenv").config();

const mongoDB_User = process.env.MONGODB_USER;
const mongoDB_Password = process.env.MONGODB_PASSWORD;

// mongo client
const mongoose = require("mongoose");
const uri = `mongodb+srv://${mongoDB_User}:${mongoDB_Password}@url-shorter.clvsepk.mongodb.net/?retryWrites=true&w=majority`;

// setting up mongooes for global usage
mongoose.Promise = global.Promise;

// connecting to mongooes
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// getting databases
const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error during connecting to MongoDB: ")
);

// if we connected successfully
db.once("open", function () {
  // we're connected!
  console.log("We are connected to mongoDB :");
});
