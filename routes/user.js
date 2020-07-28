//rota seguida pelos usuarios
'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/iUserAuth')
const _USER = require('../controller/user')

// pegar a rota (get)
router.get('/', auth.authorize, _USER.get)
router.get('/registro', _USER.getRegistro)
router.get('/login', _USER.getLogin)
router.get('/logout', _USER.logout)
router.get('/edit/id/:id', auth.authorize, _USER.getById)

// postar as rotas(post)
router.post('/registro', _USER.postRegistro)
router.post('/login', _USER.postLogin)
router.post('/edit', auth.authorize, _USER.update)
router.post('/update/:id', auth.authorize, _USER.update)
router.post('/delete/:id',auth.authorize, _USER.delete)

module.exports = router