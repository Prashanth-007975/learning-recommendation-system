const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Temporary test route to verify our protect middleware works
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;