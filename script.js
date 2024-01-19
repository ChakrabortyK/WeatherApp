async function useApi(lat, long) {
  const url =
    // "./weatherResponse.json";
    `http://api.weatherapi.com/v1/current.json?key=8cf7537ff8834221846143322241401&q=${lat},${long}`;

  // console.log(url);
  try {
    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#city").innerHTML = data.location.name;
    // console.log(data);
    localTime.innerHTML = data.location.localtime.slice(11);
    condition.innerHTML = data.current.condition.text;
    let icon = data.current.condition.icon;
    const img = document.querySelector("#icon");
    img.src = icon;

    temperature.innerHTML = data.current.temp_c.toString().concat("°C");
    humidity.innerHTML = data.current.humidity.toString().concat("%");
    wind_kph.innerHTML = data.current.wind_kph.toString().concat("Km/h");
    cloud.innerHTML = data.current.cloud.toString().concat("%");
    country.innerHTML = data.location.country;
  } catch (error) {
    console.error(error);
  }
}
// useApi();

submit.addEventListener("click", function (e) {
  e.preventDefault();
  let input = document.querySelector("#cityInput");
  useApi(input.value);
});

cityInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  document.querySelector("#city").innerHTML = "Geolocation access Denied";
}

function setPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  useApi(lat, long);
}

function showError(error) {
  console.log(error.message);
  document.querySelector("#city").innerHTML = error.message;
}
