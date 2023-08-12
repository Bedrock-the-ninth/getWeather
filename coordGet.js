const main = () => {
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

main();
