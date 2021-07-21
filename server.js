import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Message from "./messageModel.js";

if (process.env.NODE_ENV !== "production"){
    dotenv.config();
}

console.log("server running");

const app = express();
app.listen(process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("database connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {
    try {
        await Message.create(req.body);
        res.status(201).send("Thank you for sharing your thoughts.");
    } catch (err) {
        console.log(err);
        res.status(201).send("Error saving your thoughts. Try again later.");
    }
});

app.post("/report", async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.body.id, { reports: req.body.report, isReported: true });
    } catch (err) {
        console.log(err);
    }
});

app.get("/message", async (req, res) => {
    try {
        const message = await Message.aggregate([{ $sample: { size: 1 } }]); //Finds a random message in the database
        res.status(200).json(message[0]);
    } catch (err) {
        console.log(err);
    }
});

app.get("/tos", (req, res) => {
    res.render("tos");
});

app.get("/pp", (req, res) => {
    res.render("pp");
});

app.use((req, res) => {
    res.status(404).render("404");
});