// function weatherApp() {
//   // Create variables
//   const cityEl = document.getElementById("city-search");
//   const searchEl = document.getElementById("search-button");
//   const clearEl = document.getElementById("clear-history");
//   const nameEl = document.getElementById("city-name");
//   const todaysIcon = document.getElementById("weather-picture");
//   const currentDescription = document.getElementById("desc");
//   const todaysTemp = document.getElementById("temp");
//   const todaysHumi = document.getElementById("hum");
//   const todaysWind = document.getElementById("wind");
//   const todaysUV = document.getElementById("uv");
//   const history = document.getElementById("history");

//   let fiveDayForecast = document.getElementById("fiveday-header");
//   let todaysWeather = document.getElementById("todays-weather");
//   //JSON
//   let savedSearchHistory = JSON.parse(localStorage.getItem("search")) || [];

//   // APIkey
//   const apiKey = "84b79da5e5d7c92085660485702f4ce8";

//   function getWeatherData(citySearch) {
//     // Call first URL to get weather data from openweathermap.org/
//     let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`;
//     // fetch(queryURL).then(function (res) {
//     axios.get(queryURL).then(function (res) {
//       // console.log(res);

//       todaysWeather.classList.remove("d-none");

//       // display current weather information for today
//       let todaysDate = new Date(res.data.dt * 1000);
//       let today = todaysDate.getDate();
//       let month = todaysDate.getMonth() + 1;
//       let year = todaysDate.getFullYear();
//       nameEl.innerText = `${res.data.name}(${month}/${today}/${year})`;
//       let weatherIcon = res.data.weather[0].icon;
//       todaysIcon.setAttribute(
//         "src",
//         "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
//       );
//       todaysIcon.setAttribute("alt", res.data.weather[0].description);
//       currentDescription.innerText =
//         res.data.weather[0].description.toUpperCase();
//       todaysTemp.innerText = `Temp: ${res.data.main.temp} °F`;
//       todaysHumi.innerText = `Humidity: ${res.data.main.humidity} %`;
//       todaysWind.innerText = `Wind: ${res.data.wind.speed} mph`;

//       //Grab second set of weather data from openweathermap.org/
//       let latitude = res.data.coord.lat;
//       let longitude = res.data.coord.lon;
//       let apiUV = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=1`;
//       axios.get(apiUV).then(function (res) {
//         console.log(res);
//         let uvCard = document.createElement("span");

//         // conditional created to show the strength of UV rays
//         if (res.data.current.uvi < 3) {
//           uvCard.setAttribute("class", "badge badge-success");
//         } else if (res.data.current.uvi < 7) {
//           uvCard.setAttribute("class", "badge badge-warning");
//         } else {
//           uvCard.setAttribute("class", "badge badge-danger");
//         }
//         // console.log(res.data.current.uvi);
//         uvCard.innerText = res.data.current.uvi;
//         todaysUV.innerText = "UV Index of: ";
//         todaysUV.append(uvCard);
//       });

//       let cityID = res.data.id;
//       let forecastQueryURL =
//         "https://api.openweathermap.org/data/2.5/forecast?id=" +
//         cityID +
//         "&appid=" +
//         apiKey +
//         "&units=imperial";
//       axios.get(forecastQueryURL).then(function (res) {
//         console.log(res);
//         fiveDayForecast.classList.remove("d-none");

//         // setup five day forecast
//         const fiveDay = document.querySelectorAll(".forecast");
//         // console.log(fiveDay);
//         for (let i = 0; i < fiveDay.length; i++) {
//           // console.log("fiveDay", fiveDay + "fiveDay.length", fiveDay.length);
//           fiveDay[i].innerHTML = "";
//           let forecastIndex = i * 8 + 4;
//           let fiveDayDate = new Date(res.data.list[forecastIndex].dt * 1000);
//           let fiveDays = fiveDayDate.getDate();
//           let fiveDayMonth = fiveDayDate.getMonth() + 1;
//           let fiveDayYear = fiveDayDate.getFullYear();
//           let fiveDayForecastDate = document.createElement("p");
//           fiveDayForecastDate.innerText =
//             fiveDayMonth + "/" + fiveDays + "/" + fiveDayYear;
//           fiveDay[i].append(fiveDayForecastDate);

//           // Icons pulled from openweathermap.org/
//           let forecastIcon = document.createElement("img");
//           forecastIcon.setAttribute(
//             "src",
//             "https://openweathermap.org/img/wn/" +
//               res.data.list[forecastIndex].weather[0].icon +
//               "@2x.png"
//           );
//           forecastIcon.setAttribute(
//             "alt",
//             res.data.list[forecastIndex].weather[0].description
//           );
//           fiveDay[i].append(forecastIcon);
//           let forecastTemp = document.createElement("p");
//           forecastTemp.innerText =
//             "Temp: " + res.data.list[forecastIndex].main.temp + " °F";
//           fiveDay[i].append(forecastTemp);
//           let forecastHumidity = document.createElement("p");
//           forecastHumidity.innerText =
//             "Humidity: " + res.data.list[forecastIndex].main.humidity + "%";
//           fiveDay[i].append(forecastHumidity);
//           let forecastWind = document.createElement("p");
//           forecastWind.innerText =
//             "Wind: " + res.data.list[forecastIndex].wind.speed + " mph";
//           fiveDay[i].append(forecastWind);
//         }
//       });
//     });
//   }

//   // Get history from local storage if any
//   searchEl.addEventListener("click", function () {
//     const searchTerm = cityEl.value;
//     getWeatherData(searchTerm);
//     savedSearchHistory.push(searchTerm);
//     localStorage.setItem("search", JSON.stringify(savedSearchHistory));
//     renderSearchHistory();
//   });

//   // Clear History button
//   clearEl.addEventListener("click", function () {
//     localStorage.clear();
//     searchHistory = [];
//     renderSearchHistory();
//   });

//   // function k2f(K) {
//   //   return Math.floor((K - 273.15) * 1.8 + 32);
//   // }

//   function renderSearchHistory() {
//     history.innerHTML = "";
//     for (let i = 0; i < savedSearchHistory.length; i++) {
//       const historyItem = document.createElement("input");
//       historyItem.setAttribute("type", "text");
//       historyItem.setAttribute("readonly", true);
//       historyItem.setAttribute("class", "form-control d-block bg-info");
//       historyItem.setAttribute("value", savedSearchHistory[i]);
//       historyItem.addEventListener("click", function () {
//         getWeatherData(historyItem.value);
//       });
//       history.append(historyItem);
//     }
//   }

//   renderSearchHistory();
//   if (savedSearchHistory.length > 0) {
//     getWeatherData(savedSearchHistory[savedSearchHistory.length - 1]);
//   }
// }

// weatherApp();

// ---------------------------
// SeatGeek API
// ---------------------------
function eventApp() {
  // Client ID for the API
  const CLIENT_ID = `Mjg2MTA4MDN8MTY2MTIxMjIzMS41NDk3NjAz`;

  // Const Event Section (Create Variables)
  const eventInput = document.querySelector(`#event-input`);
  const placeInput = document.querySelector(`#place-input`);
  const dateInput = document.querySelector(`#date-input`);

  fetch(
    `https://api.seatgeek.com/2/events?geoip=107.170.145.187&client_id=${CLIENT_ID}&per_page=25&page=3&sort=score.desc`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // console.log(data.events[0].performers[0].name);
      console.log(data.events[0].title);
      console.log(data.events[0].datetime_utc);
      console.log(data.events[0].venue.display_location);
      console.log(data.events[0].stats.average_price);
    });
}

eventApp();
