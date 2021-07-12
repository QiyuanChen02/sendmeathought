if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.listen(process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/sendMeAQuickNote", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connected to database"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.render("index");
});

