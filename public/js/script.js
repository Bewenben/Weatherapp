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
const hourlyw = document.querySelector(".hourly");
let night;
const Kelvin = 273
const weather = {};
const hourlyweather = {};
let nightcheck;

// Date Display
dateselector.innerHTML = new Date().toDateString();

// Temperature in the weather object is celsius by default
weather.temperature = {
    unit: "celsius",
}

hourlyweather.temperature = {
    unit: "celsius",
};

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
        getUserWeather(latitude, longitude);
        getHourlyWeather(latitude, longitude);
    })
} else {
    // If no, an error will appear to the user
    catcherror.innerHTML = `<p>There has been an error</p>`;
}


// Function to fetch user's location weather information from the API
async function getUserWeather(latitude, longitude) {

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
            nightcheck = weather.icon.toString().charAt(2)
            if (nightcheck === "n") {
                night = true;
            }
            else {
                night = false;
            }
            Display();
        });


    // Display the weather information
    function Display() {
        // Check if current time is day or night (ex: 6 PM - 6 AM is night, otherwise, it's day)
        if (night) {
            // Changing the text color to white during the night for better accessibility
            weathercontainer.style.color = "#FFFFFF";
            title.style.color = "#FFFFFF";
            title.innerHTML = "Tonight's Weather";
            dateselector.style.color = "#FFFFFF";
            icon.innerHTML = `<img src="img/weathericons/night/${weather.icon}.png" alt="${weather.icon}"/>`;
        } else {
            // Changing the text color to black during the day for better accessibility
            weathercontainer.style.color = "#000000";
            title.style.color = "#000000";
            dateselector.style.color = "#000000";
            title.innerHTML = "Today's Weather";
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

async function getHourlyWeather(latitude, longitude) {

    let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
        .then((res) => {
            let data = res.json();
            console.log(data);
            return data;
        })
        .then((data) => {
            let arrtemp = []
            let arrdt = []
            let arricon = []
            for (let i = 0; i < 8; i++) {
                arrtemp[i] = JSON.parse(Math.floor(data.list[i].main.temp - Kelvin))
                let unix = JSON.parse(data.list[i].dt)
                // arricon[i] = JSON.parse(data.list[i].
                let date = new Date(unix * 1000)
                let hours = date.getHours()
                let minutes = date.getMinutes()
                arrdt[i] = hours + ":" + minutes + "0"
            }
            let myChart = document.getElementById('myChart').getContext('2d');
            if (night) {
                let threehoursChart = new Chart(myChart, {
                    type: 'line',
                    data: {
                        labels: arrdt,
                        datasets: [{
                            label: 'Hours',
                            data: arrtemp,
                            backgroundColor: 'white',
                            fill: false,
                            borderColor: 'white',
                            color: "#ffffff"
                        },
                        ]
                    },
                    options: {
                        legend: {
                            labels: {
                                fontColor: "blue",
                                fontSize: 18
                            }
                        },
                        scales: {
                            y: {  // not 'yAxes: [{' anymore (not an array anymore)
                              ticks: {
                                color: "white", // not 'fontColor:' anymore
                                // fontSize: 18,
                                stepSize: 1,
                                beginAtZero: true
                              }
                            },
                            x: {  // not 'xAxes: [{' anymore (not an array anymore)
                              ticks: {
                                color: "white",  // not 'fontColor:' anymore
                                //fontSize: 14,
                                stepSize: 1,
                                beginAtZero: true
                              }
                            }
                          },
                        plugins: {
                        title: {
                            display: true,
                            text: '3-Hours Forecast',
                            fontSize: 25,
                            color: "#ffffff"
                        },
                        responsive: true,
                        legend: {
                            labels: {
                                color: "white",
                            }
                        },
                    }
                    },
                });
            }
            else {
                let threehoursChart = new Chart(myChart, {
                    type: 'line',
                    data: {
                        labels: arrdt,
                        datasets: [{
                            label: 'Hours',
                            data: arrtemp,
                            backgroundColor: 'black',
                            fill: false,
                            borderColor: 'rgb(0,0,0)',
                            color: "#ffffff"
                        },
                        ],
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: '3-Hours Forecast',
                                color: "white"
                            },
                            responsive: true,
                            legend: {
                                labels: {
                                    color: "white",
                                }
                            },
                        },
                    }
                })
            }
        })
}