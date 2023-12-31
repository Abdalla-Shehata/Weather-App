//API FROM       https://www.weatherapi.com/
var weatherData = [];
async function weather(city) {
    var apiResult = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    var finalResponse = await apiResult.json();
    weatherData = finalResponse;
    display();
    // console.log(weatherData);
    console.log(weatherData.forecast.forecastday[0].date.split('-')[2] + monthName());
}
weather(`cairo`);

document.getElementById("search").addEventListener("keyup", city => { weather(city.target.value) });
// document.getElementById("search").addEventListener("keyup", function (city) {
//     weather(city.target.value)
// });



tRow = document.getElementById('tRow');

function monthName() {
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    // console.log(month);
    return month;
}
function dayName(param) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(param);
    let day = weekdays[d.getDay()];
    // console.log(day);
    return day;
}


function display() {
    let box = `
    <div class="col">
        <div class="items shadow p-2 my-2">
            <div class="forecast-header d-flex justify-content-between"  id="today">
                <div><span>${dayName(weatherData.forecast.forecastday[0].date)}</span></div>
                <div class=" date">${(weatherData.forecast.forecastday[0].date.split('-')[2] + monthName())}</div>
            </div>
            <div><span>${weatherData.location.name}</span></div>
            <div class="current_degree">
                <h2 class='fs-1 m-0'>${weatherData.current.temp_c}<sup>o</sup>C</h2>
                <div><img src="https:${weatherData.current.condition.icon}" alt=""></div>
            </div>
            <div class="mb-1">${weatherData.current.condition.text}</div>
            <div>
                <span class="me-3"><i class="fa-solid fa-umbrella"></i> ${weatherData.current.humidity}%</span>
                <span class="me-3"><i class="fa-solid fa-wind"></i> ${weatherData.current.wind_kph}km/h</span>
                <span ><i class="fa-solid fa-compass"></i> ${weatherData.current.wind_dir}</span>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="items text-center shadow p-2 my-2">
            <div><span>${dayName(weatherData.forecast.forecastday[1].date)}</span></div>
            <div><img src="https:${weatherData.forecast.forecastday[1].day.condition.icon}" alt=""></div>
            <div>
                <p class="fs-4 mb-0">${weatherData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                <span class="d-block mb-2">${weatherData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</span>
            </div>
            <span>${weatherData.forecast.forecastday[1].day.condition.text}</span>
        </div>
    </div>
    <div class="col">
        <div class="items text-center shadow p-2 my-2">
            <div><span>${dayName(weatherData.forecast.forecastday[2].date)}</span></div>
            <div><img src="https:${weatherData.forecast.forecastday[2].day.condition.icon}" alt=""></div>
            <div>
                <p class="fs-4 mb-0">${weatherData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                <span class="d-block mb-2">${weatherData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</span>
            </div>
            <span>${weatherData.forecast.forecastday[2].day.condition.text}</span>
        </div>
    </div>
    `;
    tRow.innerHTML = box;
}
