let locationInput = document.getElementById("locationInput");
let searchBtn = document.getElementById("searchBtn");
let countryName = document.getElementById("countryName");
let countryReg = document.getElementById("countryReg");
let countryDeg = document.getElementById("countryDeg");
let countryCurrentLogo = document.getElementById("countryCurrentLogo");
let allHours = document.getElementById("allHours");
let realFeelDeg = document.getElementById("realFeelDeg");
let windKmh = document.getElementById("windKmh");
let UVDeg = document.getElementById("UVDeg");
let humidityDeg = document.getElementById("humidityDeg");
let allDays = document.getElementById("allDays");

let weatherDetails = [];
let country = "giza";

async function getWeather() {
  let weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=604881324af540ff98d180206253110&q=${country}&days=7`
  );
  let data = await weather.json();
  weatherDetails = data;
  // console.log(weatherDetails, `${country}`);
  displayData();
  displayHours();
  displayAditionalDetails();
  displayNextSevenDay();
}

getWeather();

function searchInput() {
  if(locationInput.value.trim() != ""){
    country = locationInput.value;
  } else {
    alert("Enter the country to show details");
  }

  locationInput.value = "";
  getWeather();
}

searchBtn.addEventListener("click", searchInput);

function displayData() {
  currentDegreeContainer.innerHTML = "";

  let countryAndDegree = document.createElement("div");
  let countryDiv = document.createElement("div");
  let countryNameHeading = document.createElement("h2");
  let countryRegion = document.createElement("p");
  let degreeDiv = document.createElement("div");
  let paragraph = document.createElement("p");
  let countryDegree = document.createElement("span");
  let degreeIconSup = document.createElement("sup");
  let degreeIcon = document.createElement("i");
  let logoContainer = document.createElement("div");
  let logoImage = document.createElement("img");

  countryAndDegree.setAttribute("class","countryAndDegree");
  countryDiv.setAttribute("class","country");
  countryNameHeading.setAttribute("id","countryName");
  countryRegion.setAttribute("id","countryReg");
  degreeDiv.setAttribute("class","degree");
  countryDegree.setAttribute("id","countryDeg");
  degreeIcon.setAttribute("class","fa-regular fa-circle");
  logoContainer.setAttribute("class","logo align-content-center");
  logoImage.alt = "current weather";
  logoImage.setAttribute("id","countryCurrentLogo")

  countryNameHeading.innerHTML = `${weatherDetails.location.name}`;
  countryRegion.innerHTML = `${weatherDetails.location.tz_id}`;
  countryDegree.innerHTML = `${weatherDetails.current.temp_c}`;
  logoImage.src = `https:${weatherDetails.current.condition.icon}`;

  countryDiv.append(countryNameHeading);
  countryDiv.append(countryRegion);

  degreeDiv.append(paragraph);

  paragraph.append(countryDegree);
  paragraph.append(degreeIconSup);

  degreeIconSup.append(degreeIcon);

  countryAndDegree.append(countryDiv);
  countryAndDegree.append(degreeDiv);

  logoContainer.append(logoImage);

  currentDegreeContainer.append(countryAndDegree);
  currentDegreeContainer.append(logoContainer);
}

let currentTime = new Date();
let currentHour = currentTime.toString().split(" ")[4].split(":")[0];

function displayHours() {
  allHours.innerHTML = "";
  for (let i = +currentHour; i < +currentHour + 6; i++) {
    if(i == 24){
      break;
    }
    let div = document.createElement("div");
    let headingFour = document.createElement("h4");
    let logoImg = document.createElement("img");
    let paragraph = document.createElement("p");
    let spanForDeg = document.createElement("span");
    let sup = document.createElement("sup");
    let icon = document.createElement("i");

    div.setAttribute("class", `hour p-2 text-center`);
    headingFour.innerHTML = `${
      weatherDetails.forecast.forecastday[0].hour[i].time.split(" ")[1]
    }`;
    logoImg.src = `https:${weatherDetails.forecast.forecastday[0].hour[i].condition.icon}`;
    logoImg.alt = "hour weather";
    paragraph.setAttribute("class", "degree");
    spanForDeg.innerHTML = `${weatherDetails.forecast.forecastday[0].hour[i].temp_c}`;
    icon.setAttribute("class", "fa-regular fa-circle");

    sup.append(icon);
    paragraph.append(spanForDeg);
    paragraph.append(sup);
    div.append(headingFour);
    div.append(logoImg);
    div.append(paragraph);
    allHours.append(div);
  }
}

function displayAditionalDetails() {
  realFeelDeg.innerHTML = "";
  windKmh.innerHTML = "";
  UVDeg.innerHTML = "";
  humidityDeg.innerHTML = "";

  realFeelDeg.innerHTML = `${weatherDetails.current.feelslike_c}`;
  windKmh.innerHTML = `${weatherDetails.current.wind_kph}`;
  UVDeg.innerHTML = `${weatherDetails.current.uv}`;
  humidityDeg.innerHTML = `${weatherDetails.current.humidity}`;
}

let currentDay = currentTime.toString().split(" ")[0];
// console.log(currentDay);

function displayNextSevenDay() {
  allDays.innerHTML = "";
  for (let i = 0; i < weatherDetails.forecast.forecastday.length; i++) {
    let container = document.createElement("div");
    let day = document.createElement("p");
    let child = document.createElement("div");
    let imgIcon = document.createElement("img");
    let status = document.createElement("span");
    let finallyChild = document.createElement("div");
    let hor = document.createElement("hr");

    finallyChild.setAttribute("class", "deg");

    imgIcon.src = `http:${weatherDetails.forecast.forecastday[i].day.condition.icon}`;
    imgIcon.alt = `status icon`;

    day.innerHTML = `${weatherDetails.forecast.forecastday[i].date}`;
    status.innerHTML = `${weatherDetails.forecast.forecastday[i].day.condition.text}`;
    finallyChild.innerHTML = `${
      weatherDetails.forecast.forecastday[i].day.maxtemp_c
        .toString()
        .split(".")[0]
    }/${
      weatherDetails.forecast.forecastday[i].day.mintemp_c
        .toString()
        .split(".")[0]
    }`;

    child.append(imgIcon);
    child.append(status);

    container.append(day);
    container.append(child);
    container.append(finallyChild);
    allDays.append(container);
    allDays.append(hor);
  }

}


