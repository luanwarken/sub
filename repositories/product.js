
'use strict'

require('../models/product');
const mongoose = require('mongoose');
const product_model = mongoose.model('Produto');

class Produto {
    
    static async create(id, data) {
        const tags = data.tag.split(',')
        await product_model(data)
        await product_model.insertMany(tags)
        return await product_model.save();
    }

    
    static async update(id, data) {
        return await product_model.findOneAndUpdate(id, {$set:data});
    }

  
    static async delete(id) {
        return await product_model.findByIdAndRemove(id);
    }

  
    static async getAll() {
        return await product_model.find({});
    }

    
    static async verifyProduct(data) {
        return await product_model.findOne(data)
    }
}

module.exports = Produto;