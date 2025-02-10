const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require("./config/passport"); 
app.use(
    session({
        secret: process.env.CLIENT_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);




app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.CLIENT_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

connectDB();

const bookingController = require('./controllers/booking.js');
bookingController.setSocketIo(io);


io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/stations', require('./routes/station.js'));
app.use('/api/bookings', require('./routes/booking.js'));
app.use('/api/points', require('./routes/point.js'));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server, io };
