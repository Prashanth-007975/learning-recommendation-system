const admin = (req, res, next) => {
  // This middleware assumes `protect` already ran and set req.user
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { admin };