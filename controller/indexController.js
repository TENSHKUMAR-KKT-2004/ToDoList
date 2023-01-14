const express = require('express')

var items = ["Watch Thunivu Movie", "Buy GOT Book", "Watch Breaking Bad Series", ]
var workItem = []

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
  console.log(req.body)
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
