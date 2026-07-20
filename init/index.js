if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

main()
  .then(() => {
      console.log("Connected to DB");
      return initDB();   // ✅ run AFTER connection
  })
  .catch((err) => {
      console.log(err);
  });