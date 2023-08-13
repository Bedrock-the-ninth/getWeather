const appid = "dac0c43ffcfccadddd05c3ec10c3d838";

const getLoc = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    let coordination = [crd.latitude, crd.longitude, crd.accuracy];
    postMessage(coordination);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
};

const getWeather = () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=36.3109&lon=59.51&appid=${appid}&units=metric`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// Event listeners
$("#get").on("click", getWeather);
$("#getLoc").click(() => {
  var coordArray = getCoords;
  return coordArray;
});

console.log(coordArray);
