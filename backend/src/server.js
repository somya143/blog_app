require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./config/db")
const PORT = process.env.PORT || 8080;
const authRoute = require("./features/auth/auth.routes")

app.use(cors());
app.use(express.json());
app.use("/auths" , authRoute)
app.listen(PORT , async() => {
    await connect();
    console.log(`PORT is running on ${PORT}`);
})
