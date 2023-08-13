const appid = "dac0c43ffcfccadddd05c3ec10c3d838";

const coordsDisplay = () => {
  const succes = (pos) => {
    let altAndLon = pos.coords.altitude + "," + pos.coords.longitude;

    $("#res").html = `
    <div class="card text-center">
    <h1 class="card-header">You are located at:</h1>
    <div class="card-body">
      <p>Your latitude: ${pos.coords.altitude}</p>
      <p>Your longitude: ${pos.coords.longitude}</p>
      <p>Accuracy: ${pos.coords.accuracy} meters</p>
    </div>
  </div>
  `;

    return altAndLon;
  };

  const error = (error) => {
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
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(succes, error, options);
  } else {
    $("#res").html("Geolocation is not supported");
  }
};

const getWeather = () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=36.3109&lon=59.51&appid=${appid}&units=metric`
    )
    .then((res) => {
      $("#res").html = `
        <div class="card text-center m-5 p-1">
          <div class="card-heading display-4 d-grid">
            <h1>${res.data.main.temp} degrees
            <span class="small">feels like ${res.data.main.feels_like}</span></h1>
            <span>Max: ${res.data.main.temp_max}</span>
            <span>Min: ${res.data.main.temp_min}</span>
          </div>
          <div class="car-body">
            <p>The weather is: ${res.data.weather[0].description}</p>
            <p>Wind speed: ${res.data.wind.speed}</p>
            <p>You are currently in ${res.data.sys.country}, ${res.data.name}</p>
            <p>Sunrise in: ${res.data.sys.sunrise}</p>
            <p>Sunset in: ${res.data.sys.sunset}</p>
          </div>
        </div>`;
    })
    .catch((err) => console.log(err));
};

// Event listeners
$("#get").click(getWeather);
$("#getLoc").click(coordsDisplay);
