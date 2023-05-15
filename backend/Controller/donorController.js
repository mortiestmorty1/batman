const Donor = require('../models/donor');

// Add a new donor
const createDonor = (req, res) => {
  const { name, bloodType, location } = req.body;

  const newDonor = new Donor({ name, bloodType, location });

  newDonor.save()
    .then(() => {
      res.status(201).json({ message: 'Donor saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save donor' });
    });
};
module.exports = {
  createDonor,
};
