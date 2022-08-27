const btnForCallApi = document.querySelector(`.btn`);
const CLIENT_ID = `Mjg2MTA4MDN8MTY2MTIxMjIzMS41NDk3NjAz`;

btnForCallApi.addEventListener(`click`, callAPI);

function callAPI() {
  fetch(
    `https://api.seatgeek.com/2/events?geoip=true&client_id=${CLIENT_ID}&per_page=25&page=3&sort=score.desc`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
