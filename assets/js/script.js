const btnForCallApi = document.querySelector(`.btn`);
const CLIENT_ID = `Mjg2MTA4MDN8MTY2MTIxMjIzMS41NDk3NjAz`;

btnForCallApi.addEventListener(`click`, callAPI);

function callAPI () {
    fetch(`https://api.seatgeek.com/2/events?client_id=${CLIENT_ID}`).then( (response) => {

        return response.json()

    }).then( (data) => {

        console.log(data);

    });
};