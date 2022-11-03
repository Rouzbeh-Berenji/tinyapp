/////////////////////////////////  Config /////////////////////////////////////
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");  //set ejs (Embedded JavaScript) as the view engine
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

///////////////////  to make submited URL readable ////////////////////////////
app.use(express.urlencoded({ extended: true }));

/////////////////////////////////  Functions //////////////////////////////////
const generateRandomString = function () {
  return Math.random().toString(36).slice(2, 7);
};
/////////////////////////////////  App Routes /////////////////////////////////
//  Homepage
app.get("/", (req, res) => {
  res.send("Hello!");
});
// for creat a new URL
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
// redirect to the existed URL
app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const longURL = urlDatabase[id]
  res.redirect(longURL);
});
// listing existing URL in database as a table
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});
// redirect user to new generated short URL 
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  const newId = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[newId] = longURL;
  res.redirect(`/urls/${newId}`);
});
// send the new pair URLs to urlDatabase
app.post("/urls/:id", (req, res) => {
  const id = req.params.id;
  const longURL = req.body.longURL;
  urlDatabase[id] = longURL;
  res.redirect('/urls/');
});