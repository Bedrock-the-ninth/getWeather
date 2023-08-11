const appid = "dac0c43ffcfccadddd05c3ec10c3d838";

const getWeather = () => {
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?lat=36.3109&lon=59.51&appid=dac0c43ffcfccadddd05c3ec10c3d838&units=metric"
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const getCoords = () => {
  if (navigator.geolocation) {
  } else {
  }
};

// Event listeners
$("#get").on("click", getWeather);
