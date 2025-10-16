//jshint esversion:6

const express = require("express");
const app = express();

var reqCount = 0;

app.get("/", function(req, res){
  reqCount = reqCount+1;
  console.log("got " + reqCount + " req");
  res.send("hello");
});

app.get("/about", function(req, res){
  res.send("Hi, my name is Shamathmika.\r\nI am from Manipal originally, a small \"educational\" town in South Karnataka");
});

app.listen(3000, function(){
  console.log("Started listening in port 3000");
});
