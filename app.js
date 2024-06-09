require("dotenv").config()
const createError = require("http-errors")
const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

// override with POST having ?_method=(DELETE|PUT)
app.use(methodOverride('_method'))

const cloudinary = require("cloudinary").v2

// Configure your cloud name, API key and API secret:
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

const isLoggedIn = (req, res, next) => {
  // this should be a middleware that checks if the user is logged in
  return next()
}

// Upload signing API
// (using this API should require authentication)
app.get("/api/signuploadwidget", isLoggedIn, (req, res, next) => {
  // Timestamp and cloudinary utility function used to sign an Upload Widget upload.
  const timestamp = Math.round((new Date).getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      source: "uw",
      folder: "signed_upload_demo_uw"
    },
    cloudinary.config().api_secret
  )

  res.json({
    signature: signature,
    timestamp: timestamp,
    cloudname: cloudinary.config().cloud_name,
    apikey: cloudinary.config().api_key,
  })
})

// Update user profile (including uploading a profile picture)
// (using this API should require authentication)
app.put("/users/:id/profile", isLoggedIn, async (req, res, next) => {
  // req.body includes updated user data, including profile picture url from Cloudinary Upload Widget
  console.log(req.body)
  // Now you can find the User by their ID and update
  // Redirect to profile page or send back JSON response
  res.status(200).send(`Data you sent to the backend for user with ID ${req.params.id}: ${JSON.stringify(req.body, null, 4)}`)
})

// static files
app.use(express.static("public"))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

// module.exports = app
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"
app.listen(port, () => console.info(`Server is up on http://${host}:${port}`))
