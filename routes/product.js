//rota seguida pelos produtos
'use strict'

const express = require('express')
const router = express.Router()
const _PRODUTO = require('../controller/product')
//criacao da rota
router.get('/', _PRODUTO.getAll)
router.post('/cadastro', _PRODUTO.create)

module.exports = router