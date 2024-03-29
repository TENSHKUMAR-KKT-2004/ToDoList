const express = require('express')
const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema({
  name: String
})
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

const List = mongoose.model("List", listSchema)

module.exports = List
