'use strict'

const User = require('../repositories/user'); 
const auth = require('../middlewares/auth'); 
const crypt = require('bcryptjs'); 
const storage = require('node-sessionstorage'); 


exports.get = async (req, res, next) => { 
    try {
        const users = await User.getAll();
        const qtd = await User.getUsersQtd();
        return res.render('pages/user/_users-list', {user: users, qtd: qtd});
    } catch (err) {
        next(err);
    }
}


exports.getById = async (req, res, next) => {
    try {
        const user = await User.getById(req.params.id);
        if(user) {
            return res.render('pages/user/_user-edit', {user: user, success: 'Usuário encontrado!'});
        } else {
            return res.render('pages/user/_user-edit', {error: 'Este usuario não foi encontrado.'});
        }
    } catch(err) {
        next(err);
    }
}


exports.update = async (req, res, next) => {
    try {
        await User.update(req.params.id, req.body);
        return res.render('pages/user/_user-edit', {success: 'Os dados foram atualizados com sucesso!'});
    } catch (err) {
        next(err);
    }
}


exports.delete = async (req, res, next) => {
    try {
        await User.delete(req.params.id);
        return res.redirect('/api/usuario');
    } catch (err) {
        next(err);
    }
}


exports.getRegistro = (req, res) => { 
    return res.render('pages/user/_register');
}


exports.postRegistro = async (req, res, next) => {
    try {
        const user = await User.registerVerification(req.body)
        if(!user) {
            await new User(req.body).create();
            return res.render('pages/user/_register', {success: 'Usuário cadastrado com sucesso!'});
        } else {
            return res.render('pages/user/_register', {error: 'Usuário já cadastrado!'});
        } 
    } catch(err) {
        next(err);
    }
}


exports.getLogin = (req, res) => {
    return res.render('pages/user/_login');
}


exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.loginVerification(req.body);
        if(!user) 
            return res.render('pages/user/_login', { error: 'Usuário não encontrado!'});

        if(!await crypt.compare(req.body.senha, user.senha)) 
            return res.render('pages/user/_login', { error: 'Senha inválida!'});
        
        const token = await auth.generateToken({user});
        storage.setItem('login', token);
        return res.render('pages/user/_login', {success: 'Usuário logado com sucesso!'});
    } catch(err) {
        next(err);
    }
}


exports.logout = async (req, res, next) => {
    try {
        await storage.removeItem('login');
        return res.redirect('/');
    } catch (err) {
        next(err);
    }
}
