const express = require('express')
const mongoose = require('mongoose')
const _ = require('lodash')

// DB models
const Items = require('../models/itemsSchema.js')
const List = require('../models/listSchema.js')

// date
// const today = new Date()
// const option = {
//   weekday: 'long',
//   day: 'numeric',
//   month: 'long'
// }
// const day = today.toLocaleDateString('en-US', option)

// default lists
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
  const defaultList = Items.find({}, (err, foundList) => {
    if (foundList.length === 0) {
      Items.insertMany(defaultItems)
      res.redirect('/')
    } else {
      res.render('index', {
        listTitle: "Today",
        newListItem: foundList
      })
    }
  })
}

const post_index = (req, res) => {
  const itemName = req.body.newItem
  const listName = req.body.listName
  
  const newItem = new Items({
    name: itemName
  })

  if(listName==="Today"){
    newItem.save()
    res.redirect('/')
  }else{
    List.findOne({name:listName},(err,foundList)=>{
      foundList.items.push(newItem)
      foundList.save()
      res.redirect('/'+listName)
    })
  }
}

const delete_item = (req, res) => {
  const id = req.body.id
  const listName = req.body.listName

  if(listName==="Today"){
    Items.findByIdAndRemove(id, (err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/')
      }
    })
  } else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}},(err)=>{
      if(!err){
        res.redirect('/'+listName)
      }else{
        console.log(err)
      }
    })
  }
}

const custom_route = (req, res) => {
  const customListName = _.capitalize(req.params.customListName)

  List.findOne({
    name: customListName
  }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        //create a list
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save()
        res.redirect('/' + customListName)
      } else {
        res.render('list', {
          listTitle: foundList.name,
          newListItem: foundList.items
        })
      }
    }
  })
}

module.exports = {
  get_index,
  post_index,
  delete_item,
  custom_route
}
