const router = require('express').Router()

router.use('/api', require('./listRoutes.js'))
router.use('/', require('./htmlRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./budgetRoutes.js'))

module.exports = router
