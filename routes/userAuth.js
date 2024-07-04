// ROUTES MODEL
const express = require('express')
const router = express.Router()
const {Register, Login} = require('../controllers/userAuth')
const AuthMiddleware = require('../middleware/authMiddleware')

router.post('/register', Register)
router.post('/login', Login)

module.exports = router