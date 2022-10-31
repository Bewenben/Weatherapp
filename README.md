# Weather App

## Documentation

### Getting Started

#### Run the application

You can run the application using live server extension (Available in Visual Studio Code) or using browser sync.

` npm install -g browser-sync `

- If you are using live server extension, just click on the "public" folder and you are in.

- If you are using browser sync, run the following command in the project directory and open "index.html" file.

`browser-sync start --server --directory --files ["* .html", "* .css", "* .js"]`

#### Opening

Once you open the application, it detects your current location using your position's latitude and longitude giving you the current weather information and a 3-hour weather forecast in a line chart for the next 48 hours.

#### Find out about other cities and countries

You can use the search bar above to search for any country or city you like.

How to:

- Write the city's name
- in case if it didn't work out like you wanted, make sure to add the country's abbreviation to be more accurate. (ex. Cairo, EG)

#### Need to go back to your current location?

Just click on "Current Location" button next to the search bar and BOOM, you are back to the homeland.

#### Screenshots

![alt text](https://firebasestorage.googleapis.com/v0/b/weather-app-c74d3.appspot.com/o/2022-10-31.png?alt=media&token=4c38e9f2-5d21-4c41-9280-446e1db9a620)

![alt text](https://firebasestorage.googleapis.com/v0/b/weather-app-c74d3.appspot.com/o/2022-10-31%20(4).png?alt=media&token=480efb74-b285-4525-9a3f-01fe422eb119)

![alt text](https://firebasestorage.googleapis.com/v0/b/weather-app-c74d3.appspot.com/o/2022-10-31%20(3).png?alt=media&token=2393a6cc-4258-4465-afed-5b300d1a562a)

![alt text](https://firebasestorage.googleapis.com/v0/b/weather-app-c74d3.appspot.com/o/2022-10-31%20(1).png?alt=media&token=ec01b14e-3548-4d24-a2ac-92e368224a86)

![alt text](https://firebasestorage.googleapis.com/v0/b/weather-app-c74d3.appspot.com/o/2022-10-31%20(5).png?alt=media&token=e0a9fa06-9136-4100-82e3-af4c4668368f)

-----------------

Need to know how it works? The whole code is full of comments explaining what's happening.

-----------------

## Changelog

### Version 3.0.2.2

- Fixed bug with chart data, hours labe has been replaced with temperature.

### Version 3.0.2.1

- Added Screenshots & Installation Guide

### Version 3.0.2

- Added more comments to the code so everything looks clear enough for everyone.

### Version 3.0.1

- Fixed Responsiveness after adding new components.

### Version 3.0

- Added Search for any country, city's weather + current location button.

### Version 2.0

- Added Hourly Forecast data with chart.js.

### Version 1.0.1

- Fixed Responsiveness.

### Version 1.0

- Initial Release.
