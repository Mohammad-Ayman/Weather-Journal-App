/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API = ",&appid=aa0de7532823c81cb08973e0cfe98a1c&units=metric";

const generate = document.getElementById("generate");
const feeling = document.getElementById("feelings");
const zipCode = document.getElementById("zip");
const entry = document.getElementsByClassName("entry");

const dateUi = document.getElementById("date");
const zipCodeUi = document.getElementById("zipHolder");
const temperatureUi = document.getElementById("temp");
const feelingUi = document.getElementById("content");

// Create a post date instance dynamically with JS
let d = new Date();
let postDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//get function
generate.addEventListener("click", performAction);

function performAction(e) {
  getWeather(zipCode.value).then((retrievedData) => {
    // console.log(retrievedData);
    postWeather("/postAll", {
      date: postDate,
      zipCode: zipCode.value,
      city: retrievedData.name,
      temperature: retrievedData.main.temp,
      userResponse: feeling.value,
    });
    updateUI();
  });
}

/*
The performAction function, which is called by the generate event listener, 
calls getWeather and postWeather inside the promise's then method,
after they have been defined.
 */

//get route function
const getWeather = async (userZipCode) => {
  const url = baseUrl + userZipCode + API;
  const response = await fetch(url);
  try {
    if (response.ok) {
      const getData = await response.json();
      console.log(`getWeather returns: `);
      console.log(getData);
      return getData;
    } else {
      // throw new Error(`HTTP error! status: ${response.status}`);
      alert(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log("error", error);
  }
};
//post route function

const postWeather = async (url, data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const postData = await response.json();
    console.log(`postWeather returns: `);
    console.log(postData);
    return postData;
  } catch (error) {
    console.log("error", error);
  }
};

//function to update the UI
const updateUI = async () => {
  const request = await fetch("/getAll");
  try {
    const lastEntry = await request.json();
    console.log(`updateUI gets: `);
    console.log(lastEntry);

    dateUi.innerHTML = "Date is: " + lastEntry.date;
    zipCodeUi.innerHTML = `City and Zip code is: ${lastEntry.cityName}, ${zipCode.value}`;
    temperatureUi.innerHTML =
      "Temperature: " + Math.round(lastEntry.temperature) + "&degC";
    feelingUi.innerHTML = "User feeling: " + lastEntry.userFeeling;
  } catch (error) {
    console.log("error", error);
    temperatureUi.innerHTML = "Error retrieving temperature data";
  }
};
