const express = require('express');
const hbs= require('hbs');
const fs=require('fs');
const port =process.env.PORT || 3000;
var app=express();
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n');
next();
});
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: `Home`,
    welcome: 'Hii this your page',
    CurrentYear:new Date().getFullYear()
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: `About Page`
  });

});
app.get('/portfolio',(req,res)=>{
  res.render('portfolio.hbs',{
    pageTitle: `Portfolio Page`,
    welcome: `Hii this is your portfoilio page`
  });

});
app.get('/Bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to fullfill your request'
  });
});
app.listen(port,()=>{
  console.log(`server is started with ${port}`);
});
