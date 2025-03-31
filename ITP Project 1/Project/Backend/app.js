//pass = 6cCaEFbz4hzlxRcG

const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require('./Routes/orderRoute');



const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use('/api', orderRoutes);



mongoose.connect("mongodb+srv://admin:6cCaEFbz4hzlxRcG@cluster0.wqz7j.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));