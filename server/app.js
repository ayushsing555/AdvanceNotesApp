const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
app.use(cookieparser());

app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const db = process.env.DATABASE_NAME;
require("./db/conn")
const port = process.env.PORT||8080;
app.use(require("./router/path"))
app.listen(port,()=>{
    console.log("listen successful")
})