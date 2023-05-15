const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./Routes/userRoutes');
const donorRoutes = require('./Routes/donorRoutes');
const User = require('./models/user');
const Donor = require('./models/donor');
const port = 3000;

// Connect to MongoDB database
let db = "mongodb+srv://Shoaib:1234@cluster0.gpd3dqc.mongodb.net/bloodbank?retryWrites=true&w=majority"
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Parse request bodies as JSON
app.use(bodyParser.json());

// User routes
app.use('/users', userRoutes);

// Donor routes
app.use('/donors', donorRoutes);



// Add a new user
app.post('/users', (req, res) => {
  const { name, location } = req.body;

  // Create a new user object
  const newUser = new User({ name, location });

  // Save the user to the database
  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User saved successfully' });
      //add this user to db
      
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save user' });
    });
});

// Generate and send requests to nearby users
app.get('/users/:userId/send-requests', (req, res) => {
  const { userId } = req.params;

  // Find the user by ID
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Get the user's location
      const userLocation = user.location;

      // Find nearby donors
      Donor.find({ location: { $near: userLocation } })
        .then((donors) => {

          for (const donor of donors) {
            console.log(`Sending request to donor ${donor.name}`);
          }
          res.status(200).json({ message: 'Requests sent successfully' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to find nearby donors' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to find user' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
