const router = require('express').Router()
const { join } = require('path')
const fs = require('fs/promises')

router.get('/lists', (req, res) => {
  res.sendFile(join(__dirname, '../public/lists.html'))
})
router.get('/users', (req, res) => {
  res.sendFile(join(__dirname, '../public/login.html'))
})

module.exports = router 