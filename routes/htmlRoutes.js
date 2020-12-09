const router = require('express').Router()
const { join } = require('path')
const fs = require('fs/promises')

router.get('/lists', (req, res) => {
  res.sendFile(join(__dirname, '../public/lists.html'))
})

module.exports = router 