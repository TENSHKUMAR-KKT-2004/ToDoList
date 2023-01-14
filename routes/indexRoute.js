const express = require('express')
const router = express.Router()
const indexController = require('../controller/indexController.js')

router.get('/',indexController.get)
router.post('/',indexController.post)

module.exports = router
