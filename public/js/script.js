const icon = document.querySelector(".weather-icon");
const value = document.querySelector(".temp-val p");
const description = document.querySelector(".temp-desc p");
const loc = document.querySelector(".location p");
const catcherror = document.querySelector(".error");
const dateselector = document.querySelector(".date");
const bg = document.getElementsByTagName("BODY")[0];
const weathercontainer = document.querySelector(".weather-container");
const title = document.querySelector(".app-title");
const key = "82005d27a116c2880c8f0fcb866998a0";
let night;
const Kelvin = 273
const weather = {};


// Date Display
dateselector.innerHTML = new Date().toDateString();

// Temperature in the weather object is celsius by default
weather.temperature = {
    unit: "celsius",
}

// If the user clicks on the temperature value, it will be converted to fahrenheit (if celsius)
// or celsius (if fahrenheit), otherwise it won't work
value.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === "celsius") {
        let fahrenheit = CtoF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        value.innerHTML = `${fahrenheit} <span>°F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else {
        value.innerHTML = `${weather.temperature.value} <span>°C</span>`;
        weather.temperature.unit = "celsius";
    }
})

// Function to convert the temperature value from celsius to fahrenheit
function CtoF(valuetemp) {
    return (valuetemp * 1.8) + 32;
}

// Checking if the user's location can be retrieved
if ("geolocation" in navigator) {
    // If yes, the user's location (latitude and longitude) will be retrieved
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    })
} else {
    // If no, an error will appear to the user
    catcherror.innerHTML = `<p>There has been an error</p>`;
}


// Function to fetch weather information from the API
async function getWeather(latitude, longitude) {

    // OpenWeatherApp API is used to retrieve weather information based on user's location (latitude and longitude)

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then((res) => {
            let data = res.json();
            return data;
        })
        .then((data) => {
            // Temp value is retrieved in Kelvin so, to get the temperature in celsius, temperature is subtracted by 273 (Kelvin)
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            // The weather's condition
            weather.description = data.weather[0].description;
            // The weather's condition's icon
            weather.icon = data.weather[0].icon;
            // The weather's condition's in a certain city
            weather.city = data.name;
            // The weather's condition's in a certain country
            weather.country = data.sys.country;
        }).then(() => {
            Display();
        });


    // Display the weather information
    function Display() {
        const nightcheck = weather.icon.toString().charAt(2)
        // Check if current time is day or night (ex: 6 PM - 6 AM is night, otherwise, it's day)
        if (nightcheck === "n") {
            night = true;
            // Changing the text color to white during the night for better accessibility
            weathercontainer.style.color = "#FFFFFF";
            title.style.color = "#FFFFFF";
            title.innerHTML = "Tonight's Weather";
            dateselector.style.color = "#FFFFFF";
        } else {
            night = false;
            // Changing the text color to black during the day for better accessibility
            weathercontainer.style.color = "#000000";
            title.style.color = "#000000";
            dateselector.style.color = "#000000";
            title.innerHTML = "Today's Weather";
        }
        // if the current time is night, the white icons will be displayed
        if (night) {
            icon.innerHTML = `<img src="img/weathericons/night/${weather.icon}.png" alt="${weather.icon}"/>`;
        }
        // if the current time is day, the black icons will be displayed
        else {
            icon.innerHTML = `<img src="img/weathericons/day/${weather.icon}.png" alt="${weather.icon}"/>`;
        }
        bg.style.backgroundImage = `url("./img/${weather.icon}.jpg")`;
        value.innerHTML = `${weather.temperature.value} <span>°C</span>`;
        // Since the description is retrieved in small letters, descr is used to capitalize the first letter
        const descr = weather.description.charAt(0).toUpperCase() + weather.description.slice(1)
        description.innerHTML = descr;
        loc.innerHTML = `${weather.city}, ${weather.country}`;
    }
}