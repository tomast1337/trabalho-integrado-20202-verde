var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Postagem = require('../models/postagem');
const Projetos = require('../models/projetos');
var authenticate = require('../authenticate');
const Usuario = require('../models/usuario');
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/users');
var nome;
const cors = require('./cors');


router.use(bodyParser.json());



router.route('/')
.options((req, res) => { res.sendStatus(200);})
.get(async (req, res, next) => {

  try{
    const projetobd = await Projetos.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(projetobd);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
  
})

.post(authenticate.verifyUser,(req, res, next) => {

  Projetos.create(req.body)
  .then((projetobd) => {
      console.log('Projeto criado ', projetobd);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(projetobd);
  }, (err) => next(err))
  .catch((err) => next(err));
})


router.route('/:id')
.put(authenticate.verifyUser,(req, res, next) => {
  
  Projetos.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((projeto) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(projeto);
  }, (err) => next(err))
  .catch((err) => next(err));

})
.delete(authenticate.verifyUser,(req, res, next) => {
  
  Projetos.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.get((req, res, next) => {
  
  Projetos.findById(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));

})