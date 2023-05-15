const User = require('../models/user');
const authenticate = require('../middleware/authenticateMiddleware');

// Create a new user
const createUser = (req, res) => {
  const { name, location } = req.body;

  const newUser = new User({ name, location });

  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save user' });
    });
};

module.exports = {
  createUser,
};
