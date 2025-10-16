//jshint esversion:8

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Need name for fruit"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// Give singular form. Itll create a collection in plural
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid"
});

//fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 5,
    review: "Meh"
});

// pineapple.save();

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});

// person.save();

// Person.updateOne({
//     name: "John"
// }, {
//     favouriteFruit: fruit
// }, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Added apple as favourite fruit for john");
//     }
// });

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Yay"
});


const orange = new Fruit({
    name: "Orange",
    rating: 7,
    review: "Good fruit good life"
});


const banana = new Fruit({
    name: "Banana",
    rating: 10,
    review: "Yum"
});


// Fruit.insertMany([kiwi, orange, banana], function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Success!");
//     }
// });

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {

        mongoose.connection.close(); // closing the connection here since we already have the entire db in "fruits"

        fruits.forEach((fruit) => {

            console.log(fruit.name);
        });

    }
});


//why does this work even though connection is closed in line 81? something related to connection.close vs disconnect. im not very sure
// Fruit.updateOne({
//     name: "Apple"
// }, {
//     rating: 8
// }, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Updated!");
//     }
// });


// // Using native driver:
// //connect to a cluster
// const { MongoClient } = require("mongodb");
//
// // Replace the following with your Atlas connection string
// const dbName = "fruitProjectDatabase";
// const url = "mongodb+srv://shamathmika:NewPass@fruitprojectcluster.nss52.mongodb.net/"+dbName+"?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
// const client = new MongoClient(url, {useUnifiedTopology: true});
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const db = client.db(dbName);
//
//         // Use the collection "people"
//          const collection = db.collection("fruits");
//
//          await collection.insertMany([
//              {
//                  name: "Apple",
//                  score: 8,
//                  review: "Good fruit"
//              },
//              {
//                  name: "Orange",
//                  score: 6,
//                  review: "Kinda sour"
//              },
//              {
//                  name: "Banana",
//                  score: 9,
//                  review: "Great stuff!"
//              }
//          ]);
//
//          const myDoc = await collection.find({});
//          // Print to the console
//          console.log(myDoc);
//
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
