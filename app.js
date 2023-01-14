const express = require('express')

// Routers
const index_router = require('./routes/indexRoute.js')

// create app
const app = express()

// regiter the view engine as ejs
app.set('view engine', 'ejs')

// set a middleware and static files
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static('public'))

app.use('/', index_router)

app.listen(3000)
