const express = require('express');
let server = express();

server.use(express.static('public'));
server.set('view engine', 'ejs');

server.get("/SignUpForm.html", (req, res) => {
    res.render("SignUpForm");
  });

server.get('/',(req, res)=>{
    res.render('Main');
})




server.listen(4000);