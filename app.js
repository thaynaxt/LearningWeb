var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Permite CORS para todas as rotas
app.use(cors());

// Configurações da aplicação
const api = axios.create({
  baseURL: 'https://2787daae-a9f7-40cb-b097-290519f4cdb7-00-349ki8atiq1c1.riker.replit.dev/'
});

// Rota para buscar a palavra
app.get('/api/palavra', async (req, res) => {
  try {
    const response = await api.get('/palavra');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar palavra da API:', error);
    res.status(500).json({ error: 'Erro ao buscar palavra' });
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota para a página de Jogos
app.get('/jogos', (req, res) => {
  res.render('jogos');
});

app.get('/velha', (req, res) => {
  res.render('velha');
});

app.get('/forca', (req, res) => {
  res.render('forca');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
