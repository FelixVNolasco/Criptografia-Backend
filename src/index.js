const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");
const authRouter = require("./routes/auth");
const rsaRouter = require("./routes/encrypt");

const app = express();

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/rsa", rsaRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running!");
});


app.get("/", (req, res) => {
    res.send("HOME");
});
