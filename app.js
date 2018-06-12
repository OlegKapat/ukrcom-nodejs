var express = require('express');
var app = express();

var jquery = require('jQuery');
var config=require('./config');

const conf=require('./config');
var bodyParser=require('body-parser');
const News=require('./models/news');
const User=require('./models/user');
var staticAsset = require('static-asset');
const path=require('path');
// sets and users
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
//routers
app.get('/news', (req, res) => res.render('news'));
app.get('/auth',(req,res)=>res.render('auth'));
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

app.get('/auth',(reg,res)=>{
    name:reg.body.name;
    password:reg.body.password;
    if(name=='Oleg' || password=='asdasd'){
      res.redirect('./news');
    }
    else{
      console.log("Невірний пароль");
    }
})
module.exports=app;
// catch 404 and forward to error handler
app.use((reg,res,next)=>{
  const err=new Error("Сторінка не знайдена");
  err.status=404;
  next(err);
})
// error handler
// eslint-disable-next-line no-unused-vars
app.use((error,reg,res,next)=>{
  res.status(error.status || 500);
  res.render('error',{
    message:error.message,
    error:!config.IS_PRODUCTION ? error:{},
    title:"Щось пішло не так"
  });
});

