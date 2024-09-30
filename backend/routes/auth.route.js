const express = require("express")
const {
  signup,
  login,
  logout,
  checkAuth,
} = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()

router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router
