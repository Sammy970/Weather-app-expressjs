const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
// import fetch from 'node-fetch';
const fetch = require('node-fetch');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/submit', (req, res) => {
    const cityName = req.body.city;
    // console.log(cityName);

    const api = "37c24afdf34f83fe4191b89391445c00"

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + api + '&units=metric'

    var temp;
    var pressure;
    var humidity;
    var weatherIcon;
    var desc;

    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            temp = data["main"].temp;
            pressure = data["main"].pressure;
            humidity = data["main"].humidity;
            weatherIcon = data["weather"][0].icon;
            desc = data["weather"][0].description;

            const weatherData = {
                'temp': temp,
                'pres': pressure,
                'humidity': humidity,
                'desc': desc,
                'icon': weatherIcon
            }

            res.send(weatherData);

        })

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(
    `Server started on PORT ${PORT}`));