import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Message from "./messageModel.js";

if (process.env.NODE_ENV !== "production"){
    dotenv.config();
}

const app = express();
app.listen(process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {
    try {
        await Message.create(req.body);
        res.send("Thank you for sharing your thoughts.");
    } catch (err) {
        console.log(err);
        res.send("Error saving your thoughts. Try again later.");
    }
});

app.get("/message", async (req, res) => {
    try {
        const message = await Message.aggregate([{ $sample: { size: 1 } }]); //Finds a random message in the database
        res.json(message[0]);
    } catch (err) {
        console.log(err);
    }
});