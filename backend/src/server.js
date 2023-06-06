require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./config/db")
const PORT = process.env.PORT || 8080;

app.use(cors());
app.listen(PORT , async() => {
    await connect();
    console.log(`PORT is running on ${PORT}`);
})
