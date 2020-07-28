
const mongoose = require('mongoose')


const usuario_model = new mongoose.Schema({
    nome: {
        trim: true, 
        createIndexes: true, 
        required: true, 
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false 
    }
}, {versionKey: false})

module.exports = mongoose.model('Usuario', usuario_model)
