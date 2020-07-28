
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/config/variables');
const hbs = require('express-handlebars');


const app = express();


const user_router = require('../routes/user');
const product_router = require('../routes/product');


mongoose.Promise = global.Promise;
mongoose.connect(variables.Database.connection);


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('handlebars', hbs({defaultLayout: 'main'}));


app.set('view engine', 'handlebars'); 


app.use(express.static('public')); 


app.use('/api/usuario', user_router);
app.use('/api/produto', product_router);

app.use('/', (req, res, next) => { 
    res.render('home'); 
}); 
app.use((req, res, next) => { 
    res.render('pages/errors/404'); 
}); 
app.use((err, req, res, next) => { 
    res.send(err.message); 
}); 
module.exports = app;