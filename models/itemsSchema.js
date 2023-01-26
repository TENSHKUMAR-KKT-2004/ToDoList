const express = require('express')
const mongoose = require('mongoose')

const itemsSchema = mongoose.Schema({
  name:String
})

const Items = mongoose.model("Items",itemsSchema)

module.exports = Items
