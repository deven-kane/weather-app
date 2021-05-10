const apiKey = 'a10ab33f050e18a05fba5afae114fb55';
const apiUrl = `https://api.openweathermap.org/data/2.5/`;

let now = new Date();
let time = now.toLocaleTimeString();

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const day = days[now.getDay()];

// update the h6 current day/time
let h6 = document.querySelector('h6');
h6.innerHTML = `${day} ${time}`;

//ref form
let searchCityForm = document.querySelector('#enter-city');

//add event to form
searchCityForm.addEventListener('submit', function (evt) {
  //parse data and grab value from event
  evt.preventDefault();
  let cityName = evt.target[0].value;
  let weatherDataUrl = `${apiUrl}weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(weatherDataUrl).then(showLocationWeather);
});

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showLocationWeather);
}

// use response for getCurrentPosition to start showPostition function
function showCurrentCoordinates(response) {
  const lat = response.coords.latitude;
  const lon = response.coords.longitude;
  // use variables to request response from api
  const coordDataUrl = `${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  // store coordinates variable and use callback for showLocationWeather
  axios.get(coordDataUrl).then(showLocationWeather);
}

// use response for showCurrentCoordinates to start showLocationWeather function
function showLocationWeather(response) {
  const temperature = Math.round(response.data.main.temp);
  const location = response.data.name;

  // update h3 element to reflect current location
  let currentCity = document.querySelector('.current-city');
  currentCity.innerHTML = `${location}`;

  // update h5 element to reflect current location
  let displayTemperature = document.querySelector('#temp');
  displayTemperature.innerHTML = `${temperature}`;
  displayTemperature.classList.add('F');

  // updated li element to reflect current weather description
  let weatherDescription = document.querySelector('#description');
  weatherDescription.innerHTML = response.data.weather[0].main;

  // update li element to reflect current forecast humidity
  let humidity = document.querySelector('#humidity');
  humidity.innerHTML = response.data.main.humidity;

  // update li element to reflect current forcast wind speed
  let windSpeed = document.querySelector('#wind');
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  //update li element to show current forecast icon
  let iconElement = document.querySelector('#weather-icon');
  iconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute('alt', response.data.weather[0].description);
}

// reference button element and save to a variable
let button = document.querySelector('button');
// add event listener, await response from getCurrentPosition api then apply response to the callback function
button.addEventListener('click', function () {
  navigator.geolocation.getCurrentPosition(showCurrentCoordinates);
});

function convertToCelsius(tempObj) {
  let celsiusTemp = tempObj.innerHTML * (9 / 5) + 32;
  tempObj.classList.remove('F');
  tempObj.classList.add('C');

  tempObj.innerHTML = Math.round(celsiusTemp);
}

function convertToFahrenheit(tempObj) {
  let fahrenheitTemp = (tempObj.innerHTML - 32) * (5 / 9);
  tempObj.classList.remove('C');
  tempObj.classList.add('F');

  tempObj.innerHTML = Math.round(fahrenheitTemp);
}
let tempDisplay = document.querySelector('.temperature-display');

tempDisplay.addEventListener('click', (evt) => {
  // prevent page reload
  evt.preventDefault();

  //grab element for current fahrenheit value
  let currTemp = document.querySelector('#temp');
  // parse element for current class

  console.log(currTemp);

  let clicked = evt;
  // console.log('CLICKED CLASS', clicked);

  // if the clicked element is the 'F' span and the current evt object is categorized as 'Celsius'
  if (clicked.target.id === 'fahrenheit' && currTemp.classList.contains('C')) {
    convertToCelsius(currTemp);
  } else if (
    clicked.target.id === 'celsius' &&
    currTemp.classList.contains('F')
  ) {
    convertToFahrenheit(currTemp);
  }
});

// let fahrenheitLink = document.querySelector('#fahrenheit');
// fahrenheitLink.addEventListener('click', showFahrenheitTemp);

let celsiusTemp = null;

searchCity('San Francisco');
