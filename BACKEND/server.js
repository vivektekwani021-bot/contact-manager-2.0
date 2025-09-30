const express = require("express");
const errorHandler = require("./middlewares/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;


connectDb();
//const mongoose =  require("mongoose")
//mongoose.connect("mongodb+srv://viveknotes21_db_user:vivekmongodb2121@vivek-tekwani-cluster.alufaqy.mongodb.net/?retryWrites=true&w=majority&appName=Vivek-tekwani-cluster")
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