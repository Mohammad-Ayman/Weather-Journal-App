// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
  console.log(`getALL: `);
  console.log(projectData);
});

//post routes
app.post("/postAll", (req, res) => {
  console.log(`postALL: `);
  console.log(req.body);

  projectData.data = req.body;
  projectData.date = req.body.date;
  projectData.userZipCode = req.body.zipCode;
  projectData.cityName = req.body.city;
  projectData.temperature = req.body.temperature;
  projectData.userFeeling = req.body.userResponse;
  res.send(projectData);
  console.log(projectData);
});
