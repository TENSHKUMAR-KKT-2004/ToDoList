const express = require('express')
const mongoose = require('mongoose')

// Schema
const Items = require('../models/itemsSchema.js')

var items = ["Watch Thunivu Movie", "Buy GOT Book", "Watch Breaking Bad Series", ]
var workItem = []

const item1 = new Items({
  name: "Welcome to ToDoList Application"
})

const item2 = new Items({
  name: "Enter something down below and Hit + Button to add a new list"
})

const item3 = new Items({
  name: "<-- Hit this Box to Delete the list"
})

const defaultItems = [item1, item2, item3]

Items.insertMany(defaultItems, (err) => {
  if (err) {
    console.log(err)
  }else{
    console.log("defaultItems saved")
  }
})

const get_index = (req, res) => {
  const today = new Date()
  const option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  const day = today.toLocaleDateString('en-US', option)
  res.render('index', {
    listTitle: day,
    newListItem: items
  })
}

const post_index = (req, res) => {
  let item = req.body.newItem
  if (req.body.list === "Work") {
    workItem.push(item)
    res.redirect('/work')
  } else {
    items.push(item)
    res.redirect('/')
  }
}

const get_work = (req, res) => {
  res.render('index', {
    listTitle: "Work List",
    newListItem: workItem
  })
}

const post_work = (req, res) => {
  let item = req.body.newItem
  workItem.push(item)
  res.redirect('/work')
}

module.exports = {
  get_index,
  post_index,
  get_work,
  post_work
}
