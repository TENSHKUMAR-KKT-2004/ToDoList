const express = require('express')
const router = express.Router()
const indexController = require('../controller/indexController.js')

router.get('/', indexController.get_index)
router.post('/', indexController.post_index)
router.post('/delete', indexController.delete_item)

router.get('/:customListName', indexController.custom_route)

module.exports = router
