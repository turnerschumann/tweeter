// "use strict";

// const MongoClient = require("mongodb").MongoClient;
// const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }



//   function getTweets(callback) {
//     db.collection("tweets").find().toArray(callback);
//   }


//   getTweets((err, tweets) => {
//     if (err) throw err;

//     // console.log(tweets[0]);

//     // db.close();
//     module.exports = tweets;
//   });
// });