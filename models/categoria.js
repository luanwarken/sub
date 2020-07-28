
'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema


const categoria_model = new schema({
    titulo: {
        trim: true, 
        createIndexes: true , 
        required: true, 
        type: String
    },
    descricao: {
        type: String, 
        required: true
    },
    dataCriacao: {
        type: Date, 
        default: Date.now
    }
}, {versionKey: false })


categoria_model.pre('save', next => {
    let agora = new Date()
    if (!this.dataCriacao) {
        this.dataCriacao = agora
        next() 
    }
})

module.exports = mongoose.model('Categoria', categoria_model)
