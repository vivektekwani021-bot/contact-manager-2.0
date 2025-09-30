// 
const express = require("express");
const cors = require("cors"); // <--- 1. IMPORT CORS
const errorHandler = require("./middlewares/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;

connectDb();

// 2. CONFIGURE AND USE CORS MIDDLEWARE
// The 'origin' MUST match the URL your frontend is running on (http://localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true // Important for handling cookies/sessions for authentication
}));


// MIDDLEWARE TO GET CLIENT JSON DATA ON SERVER
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//MIDDLEWARE

app.use("/api/contacts" , require("./routes/contactRoute"))
app.use("/api/users" , require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port , ()=>{
    console.log(`hello from server ${port}`)
})