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

// port
const PORT = process.env.PORT || 8888
app.listen(PORT,() => { console.log('Server..... 200.....ok') })

// Routers
app.use('/', index_router)

app.use((req,res)=>{
  res.status(404).send('404 No Route Found')
})
