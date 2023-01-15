const express = require('express')
const router = express.Router()
const indexController = require('../controller/indexController.js')

router.get('/', indexController.get_index)
router.post('/', indexController.post_index)
router.get('/work', indexController.get_work)
router.post('/work', indexController.post_work)

module.exports = router
