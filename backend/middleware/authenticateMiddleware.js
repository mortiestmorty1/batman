const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // If the user is authenticated, you can proceed to the next middleware or route handler
    next();
  };
  
  module.exports = authenticate;
  