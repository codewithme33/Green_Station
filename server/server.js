const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth.js');

const cors = require("cors");



dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGODB_STRING);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in the database connection!"));
db.once("open", ()=> console.log("Now connected to MongoDB Atlas."));



if(require.main === module){
    app.listen(process.env.PORT || 3000, ()=> {
        console.log(`API is now running at port ${process.env.PORT || 3000}`);
	})
	};

module.exports = { app, mongoose};
