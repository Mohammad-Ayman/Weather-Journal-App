/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API = ",&appid=aa0de7532823c81cb08973e0cfe98a1c&units=metric";
const generate = document.getElementById("generate");
const feeling = document.getElementById("feelings");
const zipCode = document.getElementById("zip");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//get function
generate.addEventListener("click", performAction);

function performAction(e) {
  getWeather(zipCode).then((data) => {
    console.log(data);
    postWeather("/postAll", {
      // temperature:
      zip: zipCode.value,
      date: newDate,
      userResponse: feeling.value,
    });
    updateUI();
  });
}

async function getWeather(userZipCode) {
  const url = baseUrl + userZipCode + API;
  const response = await fetch(url);
  // const response = await fetch("/allData");
  try {
    const data = await response.json();
    console.log(data);
    return data; // This what I mentioned about in P3
  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
}

async function postWeather(url, data = {}) {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}
const updateUI = async () => {
  const request = await fetch("/getAll");
  try {
    const allData = await request.json();
    const lastEntry = allData[allData.length - 1]; //P5- was calling the first element (data[0]) instead of the last one.
    document.getElementById("date").innerHTML = "Date is: " + lastEntry.date;
    document.getElementById("temp").innerHTML =
      "Temperature: " + lastEntry.temperature;
    document.getElementById("content").innerHTML =
      "User feeling: " + lastEntry.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};
