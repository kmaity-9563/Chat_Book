const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'iamkm';
const authentication = require('../middleware/authMiddleware');

router.get('/init', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.query.username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (error) {
    console.error('Error during initialization:', error);
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      bcrypt.hash(password, salt, async (error, hashedPassword) => {
        if (error) {
          console.error(error);
          return next(error);
        }

        newUser.password = hashedPassword;

        try {
          await newUser.save();
          const token = jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '30d' });
          res.json({ message: 'User created successfully', token, username: newUser.username, pic: newUser.pic, isAdmin: newUser.isAdmin });
        } catch (err) {
          console.error(err);
          next(err);
        }
      });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select('username pic isAdmin');
    // if(user) {
    //   res.json({ user})
    // }

    if (!user) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    // const validate = await bcrypt.compare(password, user.password);

    // if (!validate) {
    //   return res.status(401).json({ message: 'Invalid password' });
    // }

    const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '30d' });
    res.json({ message: 'Logged in successfully',
     token  , username : user.username  , pic : user.pic , isAdmin : user.isAdmin
  });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/alluser', authentication, async (req, res, next) => {
  const searchQuery = req.query.search
    ? {
        $or: [{ username: { $regex: req.query.search, $options: 'i' } }],
      }
    : {};

  try {
    const users = await User.find({
      ...searchQuery,
      _id: { $ne: req.user._id },
    });

    res.send(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
