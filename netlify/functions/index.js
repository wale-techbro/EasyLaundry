const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get("/", (req, res) => {
  res.send("EasyLaundry API running on Firebase Functions!");
});

// Export as a Firebase Function
exports.api = functions.https.onRequest(app);
