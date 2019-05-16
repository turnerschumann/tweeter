"use strict";

// Requiring a JSON file automatically parses it and returns the data. These
// are just example tweets to make it less tedious to style the app initially.
const db = {
  tweets: require("./mongoDataHelper")
}

const tweets = require("./mongoDataHelper")

console.log("Tweets from db: " + tweets);

// console.log("db: " + db);
// console.log("tweets: " + db.tweets[0].user.name)

module.exports = db;