
'use strict'

const Produto = require('../repositories/product');


exports.create = async (req, res, next) => {
    try {
        const tags = req.body.tag;
        const produtoExiste = Produto.verifyProduct(req.body);
        if(!produtoExiste) {
            await Produto.create(req.body);
            return res.send('Medicamento cadastrado com Sucesso!');
        } else {
            return res.send('Medicamento já cadastrado!');
        }
    } catch (err) {
        next(err);
    }
}


exports.getAll = async (req, res, next) => {
    try {
        const products = await Produto.getAll();
        return res.json(products);
    } catch (err) {
        next(err);
    }
}
