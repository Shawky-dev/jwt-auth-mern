const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
//___Require Functions
const connectDB = require("./config/dbConfig")
const authRoutes = require("./routes/auth.route")
const app = express()
const PORT = process.env.PORT || 5000

//___Middlewares
app.use(cors()) //ALL CORS REQUESTS ARE ENABLED⚠️⚠️
app.use(express.json())
app.use(cookieParser())

//___Routes

app.use("/api/auth", authRoutes)

//___Start Sever
app.listen(PORT, () => {
  //Connect to DataBase
  connectDB()

  console.log(`Server is listening on port ${PORT}`)
})
