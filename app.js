const express = require("express");// using ipm install express
const app = express(); // require express like so
const https = require("https"); //require http, an inbuilt feature in node.
const bodyParser = require("body-parser"); //install using npm i body-parser and require it to access client data

app.use(bodyParser.urlencoded({extended: true})); //in order to access the data submitted by the client

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");// use this function to get html into the project
});

app.post("/", function(req , res){ //the post request
const query = req.body.cityName;
const apiKey = "47d0c4117ea0aed9e195b4b21785411d";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+ units + "&appid=" + apiKey

    https.get(url, function(response){ //make a get request using http
        console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherData = JSON.parse(data); //parse in the data using JSON in order to obtain required data
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
            res.write("<img src= " + imageUrl + ">");
            res.send()//send multiple data by using the res.write as many times as needed because res.send can only be used once.
            });
        });
    });


app.listen(3000, function(){
    console.log("Server is now running at port 3000");
});