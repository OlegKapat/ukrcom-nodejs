var express = require('express');
var app = express();

var jquery = require('jQuery');
var config=require('./config');
//  var GoogleMapsLoader = require('googlemaps'); 
//  var publicConfig = {
//   key: 'AIzaSyCohcRGZRgmvwqaj_fOLa1b2RS-he8gvO4',
//   stagger_time:       1000, // for elevationPath
//   encode_polylines:   false,
//   secure:             true, // use https
//   proxy:              'http://127.0.0.1:3000' // optional, set a proxy for HTTP requests
// };

// var gmAPI = new GoogleMapsLoader(publicConfig);

// var reverseGeocodeParams = {
//   "latlng":        "30.4553953,30.4553953",
//   "result_type":   "03142",
//   "language":      "ua",
//   "location_type": "APPROXIMATE"
// };

// gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
//   console.log(result);
// });

var bodyParser=require('body-parser');
const News=require('./models/news');
const User=require('./models/user');
var staticAsset = require('static-asset');
const path=require('path');

// sets and users
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
// app.use('/', routes.archive);
//app.use(stylus.middleware({src: __dirname + '/public', compile: compile}))
app.use('/public',express.static('public'));
app.use(staticAsset(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public')));

app.use('/javascripts',express.static(path.join(__dirname, 'node_modules','jquery','dist')));
app.use('/mdbootstrap', express.static(__dirname + '/node_modules/mdbootstrap'));
app.get('/', (req, res) =>{
  res.render('index')
});
//routers
app.get('/news', (req, res) => res.render('news'));
app.get('/main1',(reg,res)=>res.render('main1'))
app.get('/auth',(req,res)=>res.render('auth'));
app.get('/index',(reg,res)=>res.render('index'));
app.get('/licency',(reg,res)=>res.render('licency'));
app.get('/vacation',(reg,res)=>res.render('vacation'));
app.get('/quality',(reg,res)=>res.render('quality'));
app.get('/pdprice',(reg,res)=>res.render('pdprice'));
app.get('/pdabout',(reg,res)=>res.render('pdabout'));
app.get('/pdorder',(reg,res)=>res.render('pdorder'));
app.get('/telprice',(reg,res)=>res.render('telprice'));
app.get('/telcontract',(reg,res)=>res.render('telcontract'));
app.get('/telservice',(reg,res)=>res.render('telservice'));
app.get('/teldocs',(reg,res)=>res.render('teldocs'));
app.get('/contacty',(reg,res)=>res.render('contacty'));
app.get('/payment',(reg,res)=>res.render('payment'));
app.post('/news',(reg,res)=>{
  const {title,body}=reg.body;
  News.create({
    title:title,
    body:body
  }).then(post=>console.log(post.id,post.title));
  res.redirect('/');
});
 app.get('/allnews',(reg,res)=>{
  News.find({}).sort({createdAt:-1}).then(news=>res.render('allnews',{news:news})).catch(err=>{res.status(200).json({err:err})});
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



  