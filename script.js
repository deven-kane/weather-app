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
  fahrenheitTemp = response.data.main.temp;
  const temperature = Math.round(fahrenheitTemp);
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

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector('#temp');

  celsius.classList.add('active');
  fahrenheit.classList.remove('active');

  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  fahrenheit.classList.add('active');
  celsius.classList.remove('active');

  let tempElement = document.querySelector('#temp');
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

//grab element for current celsius value
let celsius = document.querySelector('#celsius');
celsius.addEventListener('click', displayCelsiusTemp);

//grab element for current fahrenheit value
let fahrenheit = document.querySelector('#fahrenheit');
fahrenheit.addEventListener('click', displayFahrenheitTemp);

//default city display
searchCity('San Francisco');
