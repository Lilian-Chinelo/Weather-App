const express = require("express");
require('dotenv').config();
const app = express(); 
const https = require("https"); 
const bodyParser = require("body-parser");




app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req , res){ 
const query = req.body.cityName;
const apiKey = process.env.WEATHER_API_KEY;
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+ units + "&appid=" + apiKey

    https.get(url, function(response){ 
        console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherData = JSON.parse(data); 
            const temp = Math.round(weatherData.main.temp);
            var weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            res.write("<p style='font-size:18'>The weather is currently " + weatherDescription + "<p>");
            res.write("<h2>The temperature in " + query + " is " + temp + " &deg;C</h2>");
            res.write("<img src= " + imageUrl + ">");
            res.send()//send multiple data by using the res.write as many times as needed because res.send can only be used once.
            
            });
            
        });
    });

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 3000;
    }
    app.listen(port);