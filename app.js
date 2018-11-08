const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

//add registerPartials when you add partials.
//must restart your terminal when you add this
//if you change anything in app.js you need to restart the terminal
//make sure the spelling is the same as the folder name
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    //getBeers() comes from the punkAPI
    .getBeers()
    //here, you need to use beers when referring to this later in beers.hbs
    //the name isn't important, as long as you remember to use the same name
    .then(beers => {
      //the console.log will appear in the terminal. It will show you what the object keys are which you'll need to use later
      console.log(beers);

      //beers.hbs is where you want to use beers
      res.render("beers.hbs", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beer", (req, res, next) => {
  punkAPI
    //getRandom() comes from punkAPI.
    .getRandom()
    .then(beer => {
      //Here, we only want to display one beer, so we pick index 0
      res.render("random-beer", { beer: beer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
