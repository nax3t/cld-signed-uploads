require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const cloudinary = require('cloudinary').v2

// Configure your cloud name, API key and API secret:
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

// Upload signing API (using this API should require authentication)
app.get('/api/signuploadwidget', (req, res, next) => {
  // Timestamp and cloudinary utility function used to sign an Upload Widget upload.
  const timestamp = Math.round((new Date).getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      source: 'uw',
      folder: 'signed_upload_demo_uw'
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

// static files
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
app.listen(port, () => console.info(`Server is up on http://${host}:${port}`))

