const express = require('express');
const router = express.Router();
// const { registerUser } = require('../controllers/userController'); // Assuming registerUser is a function in userController
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'iamkm'
const authentication = require('../middleware/authMiddleware')


router.get('/initUser', authentication, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(user)
  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return;
  }
  res.json({ username: user.username });
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user);
    // ... rest of the code
    if (user) {
      res.status(403).json({ message: 'User already exists', user });
    } else {
      let newUser = new User({ username, password });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: err.message })

        }
        bcrypt.hash(password, salt, async (error, hashedPassword) => {
          if (error) {
            console.error(err);
          } else {
            console.log(salt);
            console.log(hashedPassword);
            newUser.password = hashedPassword;
          }
          try {
            await newUser.save();
            const token = jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '30d' });
            res.json({ message: 'User created successfully', token });
          } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message })
          }
        })
      })
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', authentication, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user) {
      // Use await to ensure that bcrypt.compare completes before moving on
      const validate = await bcrypt.compare(req.body.password, user.password);

      if (validate) {
        console.log(user._id)
        console.log(user.password)
        console.log(req.body.password)
        console.log('Comparison Result:', validate);
        // res.status(401).json({ message: 'Invalid password',user });
        // res.json({user.password})
      }
      console.log(user._id)
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '30d' });
      res.json({ message: 'Logged in successfully', token });

    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/alluser', authentication, async (req, res) => {
  const searchQuery = req.query.search
    ?
    {
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
      ]
    }
    : {};
  console.log(searchQuery);

  try {
    const users = await User.find({
      ...searchQuery,
      _id: { $ne: req.user._id },
    });

    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }




  // try {
  //   const users = (await User.find(searchQuery)).find({_id: { $ne : req.user._id  }});
  //   res.send(users);


  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal Server Error' });
  // }
});




module.exports = router;
