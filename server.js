// server.js
var express = require('express');
var cors = require('cors');
var path = require('path');
var serveStatic = require('serve-static');
const request = require('request');
var axios = require('axios');

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(cors());

var port = process.env.PORT || 8000;
var hostname = '127.0.0.1';

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const api = 'https://api.themoviedb.org/3';
const api_key = 'bc99cd379dddfeaab82eb34ff8d6c518';
const lang = 'pt-BR';

//ROTAS
app.get('/api/filmes', function (req, res) {
    var page = req.query.page;
    axios.get(api + '/movie/popular?api_key=' + api_key + '&language=' + lang + '&page=' + page)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/api/filmes/trailer', function (req, res) {
    var filme_id = req.query.filme_id;
    axios.get(api + '/movie/' + filme_id + '/videos?api_key=' + api_key + '&language=' + lang)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/api/filmes/busca', function (req, res) {
    var search = req.query.search;
    axios.get(api + '/search/movie?api_key=' + api_key + '&language=' + lang + '&query=' + search)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/api/generos', function (req, res) {
    var page = req.query.page;
    axios.get(api + '/genre/movie/list?api_key=' + api_key + '&language=' + lang)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
