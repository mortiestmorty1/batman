const express = require('express');
const router = express.Router();
const authenticate = require('/Users/shoaibahmed/Desktop/webengineering/assignment3/backend/middleware/authenticateMiddleware.js');
const userController = require('/Users/shoaibahmed/Desktop/webengineering/assignment3/backend/Controller/UserController.js');

// User routes
router.post('/', userController.createUser);

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'This is a protected route' });
  });

module.exports = router;

