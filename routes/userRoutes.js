const router = require('express').Router()
const { PocketUsers } = require('../models')

router.get('/lists', (req, res) => {
  PocketUsers.findAll()
    .then(lists => res.json(lists))
    .catch(err => console.log(err))
})

router.post('/lists', (req, res) => {
  PocketUsers.create(req.body)
    .then(list => res.json(list))
    .catch(err => console.log(err))
})

router.put('/lists/:id', (req, res) => {
  PocketUsers.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/lists/:id', (req, res) => {
  PocketUsers.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router