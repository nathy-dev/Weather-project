const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res)=>{
  
    const query = req.body.cityName;
    const apiKey = "22b56ffae0a58db76b2469590ffe648d";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", (data)=>{
       const weatherData = JSON.parse(data);
       console.log(weatherData);
       const weatherDescription = weatherData.weather[0].description;
       const temp = weatherData.main.temp;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

       console.log(temp);
       res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>")
       res.write("<p>The weather is currently " + weatherDescription + "</p>");
       res.write("<img src = " + imageURL + ">");
       res.send();
    })
});

});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});


