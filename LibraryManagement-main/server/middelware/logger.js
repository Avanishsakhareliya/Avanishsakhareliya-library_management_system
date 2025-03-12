const verifyUser = (req, res, next) => {
    console.log("req====",req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next(); // If the user is authenticated, allow the request to continue
      }
    
      // If the user is not authenticated, respond with a 401 Unauthorized error
      return res.status(401).json({ success: false, message: 'User is not authenticated' });
  };
  
  module.exports = verifyUser;