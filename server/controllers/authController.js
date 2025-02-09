const User = require('../models/User');
const jwt = require('jsonwebtoken');
/* const axios = require('axios');
const auth0Config = require('../config/auth0'); */


const auth0Login = async (req, res) => {
  const { token } = req.body;

  try {
   
    const decodedToken = jwt.decode(token);
    const auth0Id = decodedToken.sub;
    const email = decodedToken.email;
    const name = decodedToken.name;

    
    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        user.auth0Id = auth0Id;
        await user.save();
      } else {
        user = new User({
          auth0Id,
          email,
          name,
        });
        await user.save();
      }
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    
    user = new User({
      email,
      password, 
      name,
    });
    await user.save();

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { auth0Login, register };