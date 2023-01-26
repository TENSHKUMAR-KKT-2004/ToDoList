const express = require('express')
const mongoose = require('mongoose')

// Schema
const Items = require('../models/itemsSchema.js')

const item1 = new Items({
  name: "Welcome to ToDoList Application"
})

const item2 = new Items({
  name: "Hit + Button to add a new list"
})

const item3 = new Items({
  name: "<-- Hit this Box to Delete the list"
})

const defaultItems = [item1, item2, item3]

const get_index = (req, res) => {
  const today = new Date()
  const option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  const day = today.toLocaleDateString('en-US', option)

  const defaultList = Items.find({},(err,foundList)=>{
      if(foundList.length===0){
        Items.insertMany(defaultItems)
        res.redirect('/')
      }else{
        res.render('index', {
          listTitle: day,
          newListItem: foundList
        })
      }
  })
}

const post_index = (req, res) => {
  const newList = new Items({name:req.body.newItem})
  newList.save()
  res.redirect('/')
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

const delete_item = (req,res)=>{
  const id = req.body.id
  Items.findByIdAndRemove(id,(err)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/')
    }
  })
}

module.exports = {
  get_index,
  post_index,
  get_work,
  post_work,
  delete_item
}
