const auth = (req, res, next) => {
    if (!req.session.user_id) {
      res.json({ message: 'You are not logged in'});
    } else {
      next();
    }
  };

  module.exports = auth;