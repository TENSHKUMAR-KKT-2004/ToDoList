const express = require('express')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

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

//DB connection
const dbURI = "mongodb+srv://ToDoList-Maker:hNiFbQLr1msHvWfr@blog.dm0zbcz.mongodb.net/ToDoList?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8888

mongoose.connect(dbURI)
  .then((result) => {
    console.log('DB connected.......')
    app.listen(PORT)
  })
    .catch((err)=>{
      console.log(err)
    })

// port


// Routers
app.use('', index_router)

app.use((req, res) => {
  res.status(404).send('404 No Route Found')
})
