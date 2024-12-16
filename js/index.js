
async function search(country='cairo') {
    let req=await fetch (`http://api.weatherapi.com/v1/forecast.json?key=7741ac3ce2d84f94bd902805241512&q=${country}&days=3`)
    let data = await req.json();
    document.getElementById("forecast").innerHTML = '';
    displayCurrent(data.location, data.current);
    displayAnother(data.forecast.forecastday);
    
}

document.getElementById("search").addEventListener("keyup", data => {
    search(data.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (null != current) {
        var lastUpdatedDate = new Date(current.last_updated.replace(" ", "T"));
        let todayHtml = 
            `
            <div class="card " id="today">
                              <div class="card-footer ">
                                <small class="">${days[lastUpdatedDate.getDay()]}</small>
                                <small class="">${lastUpdatedDate.getDate()}${monthNames[lastUpdatedDate.getMonth()]}</small>
                              </div>
                              <div class="card-body">
                                  <h5 class="card-title" style="color: var(--grey);">${location.name}</h5>
                                  <div class="temp text-white" style="font-size: 100px; font-weight: 500;">${current.temp_c}</sup>C</div>
                                  <img src="https:${current.condition.icon}" alt="">
                                  <div class="word mb-3" style="color: var(--blue);">${current.condition.text}</div>
                                  <div class="default d-flex">
                                      <img src="./images/icon-umberella.png" alt="" width="20px" height="20px">
                                      <p class="ms-1 me-4" style="color: var(--grey);">20%</p>
                                      <img src="./images/icon-wind.png" alt="" width="20px" height="20px">
                                      <p class="ms-1 me-4" style="color: var(--grey);">18Km/h</p>
                                      <img src="./images/icon-compass.png" alt="" width="20px" height="20px">
                                      <p class="ms-1 me-4" style="color: var(--grey);">East</p>
                                  </div>
                              </div>
             </div>
        `;
        document.getElementById("forecast").innerHTML = todayHtml;
    }
}

function displayAnother(forecastDays) {
    let forecastHtml = "";
    for (let i = 1; i < forecastDays.length; i++) {
        let forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
        forecastHtml +=
        `  <div class="card text-white text-center fw-bolder ">
                          <div class="card-footer">
                            <small class="">${days[forecastDate.getDay()]}</small>
                          </div>
                          <div class="card-body">
                           
                            <h5 class="card-title text-center px-2 py-3"> <img src="https:${forecastDays[i].day.condition.icon}" width="50px" height="50px">
                            </h5> 
    
                            <div class="card-text text-center">
                              <p class=" fs-3">${forecastDays[i].day.maxtemp_c} <br> <span class="span-card fs-5">${forecastDays[i].day.mintemp_c}</span></p>
                            
                              <p class="text-info">${forecastDays[i].day.condition.text}</p>
                            </div>
                          </div>
                          
                        </div>`
    }
    document.getElementById("forecast").innerHTML += forecastHtml;
}

search("cairo");



