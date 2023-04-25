const path = require("path");
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Middleware functions
app.use((req, res, next) => {
  console.log("Running");
  next();
});

app.use((req, res, next) => {
  var log = `${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("LogFile.log", log + "\n", (err) => {
    if (err) {
      console.log("Opps Something went wrong !!");
    }
  });
  next();
});

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "ExpressApp",
    name: "MyName",
  });
});

app.get("/intro", (req, res) => {
  res.render("intro", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "MyName",
  });
});
app.get("/history", (req, res) => {
  res.render("history", {
    title: "History",
    name: "MyName",
  });
});

app.get("/history/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "myname",
    errormessage: "Specefic membership not found !!",
  });
});

app.get("*", (req, res) => {
  // Here * means everything. Isko hamesha last me use karna hai.
  res.render("404", {
    title: "404",
    name: "No such page exist",
    errormessage: "No such page exist !!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
