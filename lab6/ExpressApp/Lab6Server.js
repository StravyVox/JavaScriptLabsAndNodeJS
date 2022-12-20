var Students = []
const express = require("express");
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();
  

app.post("/amount",jsonParser, function (request, response) {
    console.log("Amount send");
    response.json(Students.length); 
});
app.post("/info",jsonParser, function (request, response) {
    console.log("---------RECIEVED FOR INFO----------");
    console.log(request.body);
    console.log("-------------------");
    if(!request.body) return response.sendStatus(400);

    var student = request.body;
    console.log(student);
    if(student.index>Students.length){
        response.json("Error"); 
    }
    response.json(Students[student.index]); 
});
app.post("/delete",jsonParser, function (request, response) {
    console.log("---------RECIEVED FOR DELETE----------");
    console.log(request.body);
    console.log("-------------------");
    if(!request.body) return response.sendStatus(400);

    var student = request.body;
    student.index = Students.length-1;
    Students.splice(student.index, student.index);
    response.end("Deleted"); // отправляем пришедший ответ обратно
});
app.post("/redact", jsonParser, function (request, response) {
    console.log("---------RECIEVED FOR REDACT----------");
    console.log(request.body);
    console.log("-------------------");
    if(!request.body) return response.sendStatus(400);

    var student = request.body;
    Students[student.index] = (student);
    response.end("Redacted"); // отправляем пришедший ответ обратно
});

app.post("/user", jsonParser, function (request, response) {
    console.log("---------RECIEVED FOR NEW USER----------");
    console.log(request.body);
    console.log("-------------------");
    if(!request.body) return response.sendStatus(400);

    var student = (request.body);
    student.index = Students.length;
    Students.push(student);
    console.log(student);
    response.end("Added"); // отправляем пришедший ответ обратно
});
  

    
//Запуск сайта
app.get("/", function(request, response){
    response.sendFile(__dirname + "/lab6.html");
    
});
app.get("/styleLab6.css", function(req,res){
    res.sendFile(__dirname+"/styleLab6.css");
})

app.get("/Lab6AJAX.js", function(req,res){
    res.sendFile(__dirname+"/Lab6AJAX.js");
})
app.listen(3000);