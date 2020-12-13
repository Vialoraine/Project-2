const router = require('express').Router()
const { PocketUser } = require('../models')

router.get('/users', (req, res) => {
  PocketUser.findAll()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

router.post('/users', (req, res) => {
  PocketUser.create(req.body)
    .then(list => res.json(list))
    .catch(err => console.log(err))
})

router.put('/users/:id', (req, res) => {
  PocketUser.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/users/:id', (req, res) => {
  PocketUser.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router