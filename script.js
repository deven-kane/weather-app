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
  let h3 = document.querySelector('h3');
  h3.innerHTML = `${location}`;

  // update h5 element to reflect current location
  let h5 = document.querySelector('#temp');
  h5.innerHTML = `${temperature}`;
}

// reference button element and save to a variable
let button = document.querySelector('button');
// add event listener, await response from getCurrentPosition api then apply response to the callback function
button.addEventListener('click', function () {
  navigator.geolocation.getCurrentPosition(showCurrentCoordinates);
});
