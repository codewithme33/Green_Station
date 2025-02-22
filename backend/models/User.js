const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    greenPoints: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', userSchema);