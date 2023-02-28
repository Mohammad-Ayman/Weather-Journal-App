// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 4000;
const server = app.listen(port, () => {
  console.log(`App running on server ${port}`);
});

//get routes
app.get("/getAll", (req, res) => {
  res.send(projectData);
  console.log(`getALL: ${projectData}`);
});
const fakeData = {
  temperature: "lion",
  Date: "Lions are fun",
};
app.get("/allData", addFakeAnimal);

function addFakeAnimal(req, res) {
  // console.log("res");
  res.send(fakeData);
}
//post routes
app.post("/postAll", (req, res) => {
  console.log(`postALL: ${req.body}`);
  let userEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  projectData.push(userEntry);
  res.send(projectData);
});
