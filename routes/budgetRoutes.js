const router = require('express').Router()
const { Budget } = require('../models')

router.get('/budgets', (req, res) => {
  Budget.findAll()
    .then(budgets => res.json(budgets))
    .catch(err => console.log(err))
})

router.post('/budgets', (req, res) => {
  Budget.create(req.body)
    .then(list => res.json(list))
    .catch(err => console.log(err))
})

router.put('/budgets/:id', (req, res) => {
  Budget.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/budgets/:id', (req, res) => {
  Budget.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router