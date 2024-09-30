const bcryptjs = require("bcryptjs")
const User = require("../models/user.model")
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie")

const signup = async (req, res) => {
  const { email, password, name } = req.body
  try {
    //__Case(1):Fields are not inside of request body
    if (!email || !password || !name) {
      throw new Error("All Fields are required")
    }
    //__Case(2):email already in db
    //TODO⭕:add for phone number too
    const userAlreadyExists = await User.findOne({ email })
    console.log(userAlreadyExists)
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" })
    }
    //__Case(3): go ahead and hash the password
    const hashedPassword = await bcryptjs.hash(password, 10)
    const user = new User({
      email,
      password: hashedPassword,
      name,
    })
    //_Then save user to db
    await user.save()
    //_Then generate Token and set at as user cookie in the response
    generateTokenAndSetCookie(res, user._id)
    //_Then send a success message
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...user._doc,
        password: null,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" })
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" })
    }

    generateTokenAndSetCookie(res, user._id)

    res.status(200).json({
      success: true,
      message: "logged in successfully",
      user: {
        ...user._doc,
        password: null,
      },
    })
  } catch (error) {}
}

const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ success: true, message: "logged out successfully" })
}

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userID).select("-password")
    console.log(req.userID)
    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" })
    }
    res.status(200).json({ success: true, user })
  } catch (err) {
    console.log("err in checkAuth: ", err)
    res.status(400).json({ success: false, message: err.message })
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
}
