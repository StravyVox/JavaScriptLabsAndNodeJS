var Students = []
const express = require("express");
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();
  
    
//Запуск сайта
app.get("/", function(request, response){
    response.sendFile(__dirname + "/lab7.html");
    
});
app.get("/styleLab7.css", function(req,res){
    res.sendFile(__dirname+"/styleLab7.css");
})

app.get("/Lab7.js", function(req,res){
    res.sendFile(__dirname+"/Lab7.js");
})
app.listen(3000);