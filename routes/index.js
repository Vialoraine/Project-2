const router = require('express').Router()

router.use('/api', require('./listRoutes.js'))
router.use('/', require('./htmlRoutes.js'))

module.exports = router
