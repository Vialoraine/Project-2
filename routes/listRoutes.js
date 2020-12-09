const router = require('express').Router()
const { List } = require('../models')

router.get('/lists', (req, res) => {
  List.findAll()
    .then(lists => res.json(lists))
    .catch(err => console.log(err))
})

router.post('/lists', (req, res) => {
  List.create(req.body)
    .then(list => res.json(list))
    .catch(err => console.log(err))
})

router.put('/lists/:id', (req, res) => {
  List.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/lists/:id', (req, res) => {
  List.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router