const express = require('express')

let items = ["Watch Thunivu Movie","Buy GOT Book","Watch Breaking Bad Series"]

const get = (req, res) => {
  const today = new Date()
  const option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  const day = today.toLocaleDateString('en-US',option)
  res.render('index',{kindofDay:day,newListItem:items})
}

const post = (req,res)=>{
  let item = req.body.newItem
  items.push(item)
  res.redirect('/')
}

module.exports = {
  get,post
}
