//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  var query = req.body.cityName;
  var apiKey = "59f084077d7bd4e45eeae0d57aed7877";
  var units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<h1>The temperature in " + query + " is " + temp + " deg Celcius.</h1>");
      res.write("The weather is currently " + description + ".<br>");
      res.write("<img src=" + imgUrl + "></img>");
      res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("Server is running on 3000");
});
