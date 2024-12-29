import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import ejs from "ejs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory (if necessary)
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  const searchName = req.body.input;
  try {
    const jsonData = await axios.get(
      `https://superheroapi.com/api/${apiKey}/search/${searchName}`
    );
    const data = jsonData.data;
    console.log(data.results[0].biography);
    if (data.response === "success")
      res.render("index.ejs", {
        data: data.results,
        queryHolder: req.body.input,
      });
    else if (data.response === "error")
      res.render("index.ejs", { error: data.error });
  } catch (error) {
    console.error(error.message);
    res.redirect("/home");
  }
});

app.post("/search-download", async (req, res) => {
  const searchName = req.body.input;
  try {
    const jsonData = await axios.get(
      `https://superheroapi.com/api/${apiKey}/search/${searchName}`
    );
    const data = jsonData.data;
    console.log(data.results[0].biography);
    if (data.response === "success")
      res.render("download.ejs", {
        data: data.results,
        queryHolder: req.body.input,
      });
    else if (data.response === "error")
      res.render("download.ejs", { error: data.error });
  } catch (error) {
    console.error(error.message);
    res.redirect("/home");
  }
});

app.post("/search-stats", async (req, res) => {
  const searchName = req.body.input;
  try {
    const jsonData = await axios.get(
      `https://superheroapi.com/api/${apiKey}/search/${searchName}`
    );
    const data = jsonData.data;
    console.log(data.results[0].biography);
    if (data.response === "success")
      res.render("stats.ejs", { data: data.results });
    else if (data.response === "error")
      res.render("stats.ejs", { error: data.error });
  } catch (error) {
    console.error(error.message);
    res.redirect("/home");
  }
});

app.post("/id-search", async (req, res) => {
  try {
    const jsonData = await axios.get(
      `https://superheroapi.com/api/${apiKey}/${req.body.input}`
    );
    const data = jsonData.data;
    if (data.response === "success")
      res.render("idSearch.ejs", {
        element: data,
        queryHolder: req.body.input,
      });
    else res.render("idSearch.ejs", { error: data.error });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/searchId", (req, res) => {
  res.render("idSearch.ejs");
});
app.get("/download", (req, res) => {
  res.render("download.ejs");
});

app.get("/get-stats", (req, res) => {
  res.render("stats.ejs");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
