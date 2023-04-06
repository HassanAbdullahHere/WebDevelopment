const express = require('express');
let server = express();

server.use(express.static('public'));
server.set('view engine', 'ejs');

server.get("/Hobbies.html", (req, res) => {
    res.render("Hobbies");
  });

server.get('/',(req, res)=>{
    res.render('HomePage');
})




server.listen(4000);