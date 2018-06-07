var express = require('express');
var app = express();

var jquery = require('jQuery');

const conf=require('./config');
var bodyParser=require('body-parser');
const News=require('./views/models/news');
var staticAsset = require('static-asset');
const path=require('path');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
//app.use(stylus.middleware({src: __dirname + '/public', compile: compile}))
//app.use('/public',express.static('public'));
app.use(staticAsset(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public')));
app.use('/javascripts',express.static(path.join(__dirname, 'node_modules','jquery','dist')));
app.get('/', (req, res) =>{
  res.render('index')
});
app.get('/news', (req, res) => res.render('news'));
app.post('/news',(reg,res)=>{
  const {title,body}=reg.body;
  News.create({
    title:title,
    body:body
  }).then(post=>console.log(post.id));
  res.redirect('/');
});
app.get('/allnews',(reg,res)=>{
  News.find({}).then(news=>res.render('allnews',{news:news})).catch(err=>{res.status(200).json({err:err})});
})
module.exports=app;

