const appid = "dac0c43ffcfccadddd05c3ec10c3d838";

// GEOLOCATION API //
const getPosition = (options) => {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    }
  });
};

const gpsLocation = async () => {
  try {
    const geolocationData = await getPosition({
      enableHighAccuracy: true,
      // timeout: 5000,
      // maximumAge: 0,
    });

    const lat = geolocationData.coords.latitude;
    const lng = geolocationData.coords.longitude;

    return [lat, lng];
  } catch (error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $("#res").html("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        $("#res").html("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        $("#res").html("The request to get user location timed out.");
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        $("#res").html("An unknown error occurred.");
        break;
    }
  }
};

const timeConvert = (time) => {
  let data = new Date(time * 1000);
  let readable = data.toLocaleTimeString("default");
  return readable;
};

// Weather API //
const showOutput = (res) => {
  $("#res").html(`
  <div class="card text-center m-5 p-1">
    <div class="card-heading d-grid">
      <h1 class="display-1 d-grid">${res.data.main.temp} degrees
      <span class="small">feels like ${res.data.main.feels_like}</span></h1>
      <span class="display-5">The weather: ${
        res.data.weather[0].description
      }</span>
      <span class="display-5">Wind speed: ${res.data.wind.speed}</span>
    </div>
    <div class="car-body my-2">
      <p>You are currently in ${res.data.name}, ${res.data.sys.country}</p>
      <p>Sunrise in: ${timeConvert(res.data.sys.sunrise)}</p>
      <p>Sunset in: ${timeConvert(res.data.sys.sunset)}</p>
    </div>
  </div>`);
};

const getWeather = () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=36.3109&lon=59.51&appid=${appid}&units=metric`
    )
    .then((res) => {
      showOutput(res);
    })
    .catch((err) => console.log(err));
};

// Event listener //
$("#get").click(getWeather);
$("#getLoc").click(async () => {
  const coordsList = await gpsLocation();

  console.log(coordsList);
});
