const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')

router.get('/lists', (req, res) => {
  res.sendFile(join(__dirname, '../public/lists.html'))
})

router.get('/users', (req, res) => {
  res.sendFile(join(__dirname, '../public/login.html'))
})

router.get('/budgets', (req, res) => {
  res.sendFile(join(__dirname, '../public/budget.html'))
})

module.exports = router 