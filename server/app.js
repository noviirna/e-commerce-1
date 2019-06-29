if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}

const express = require("express");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const errHandler = require("./helpers/errHandler");
const routes = require("./routes/index");

if (process.env.NODE_ENV !== "prod") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

console.log("ON ENVIRONMENT :", process.env.NODE_ENV);

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errHandler);

let databaseURL;
if (process.env.NODE_ENV !== "prod") {
  databaseURL = process.env.MONGODB_LOCAL + "-" + process.env.NODE_ENV;
} else {
  databaseURL = process.env.MONGODB_URL;
}

mongoose
  .connect(databaseURL, { useNewUrlParser: true })
  .then(connected => {})
  .catch(errors => {
    console.log(JSON.stringify(errors, null, 2));
  });

if (process.env.NODE_ENV === "test") {
  module.exports = app;
} else {
  app.listen(port, () => {
    console.log("\non environment : ", process.env.NODE_ENV);
    console.log("listening to port : ", port);
  });
}

/** 
  npm init -y
  npm install mongoose express dotenv bcryptjs jsonwebtoken cors morgan --save
  npm install axios --save
  npm install google-auth-library --save
  npm install @google-cloud/storage multer --save
*/
