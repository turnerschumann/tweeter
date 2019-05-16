"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

// Defines helper functions for saving and getting tweets, using the database `db`

module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

        db.collection("tweets").insertOne(newTweet);

    },

    // Get all tweets in `db`
    getTweets: function(callback) {

    db.collection("tweets").find().toArray(callback);

    }

  };
}


// module.exports = function makeDataHelpers(db) {
// console.log("DB from: " + db)
// }