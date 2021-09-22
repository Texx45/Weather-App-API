window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let weatherImg = document.querySelector(".icon");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationName = document.querySelector(".location-name");
  let locationRegion = document.querySelector(".location-region");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=165b6354acb147fb92e121913212109&q=${lat},%20${long}&aqi=no`;

      console.log(lat);
      console.log(long);
      console.log("dynamic API:", api);
      //   console.log("static API:", apiStatic);
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const getLocation = data.location.name;
          const getRegion = data.location.region;
          const currentTemp = data.current.temp_c;
          const summary = data.current.condition.text;
          const weatherIcon = data.current.condition.icon;
          const currentTime = data.location.localtime.split(" ")[1];

          console.log(
            getLocation,
            currentTemp,
            summary,
            weatherIcon,
            getRegion,
            currentTime
          );

          //* Set DOM elements from API
          locationName.innerText = getLocation;
          //   locationRegion.innerText = getRegion;
          weatherImg.src = weatherIcon;
          temperatureDescription.innerText = summary;
          temperatureDegree.innerText = currentTemp;
          locationRegion.innerText = getRegion;

          if (summary === "Overcast") {
            document.body.classList.add("overcast-background");
          } else if (summary === "Sunny") {
            document.body.classList.add("sunny-background");
          } else if (summary === "Cloudy") {
            document.body.classList.add("cloudy-background");
          }
        });
    });
  } else {
    h1.textContent = "Location not available";
  }
});
