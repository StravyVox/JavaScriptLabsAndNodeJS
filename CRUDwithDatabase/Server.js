var mysql = require('mysql');
var express = require('express');
const app = express();
const { json, response } = require('express');
const e = require('express');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "Product"
});

con.connect(function(err) 
  {
    if (err) throw err;
    console.log("Connected!");
  });

function SendInfoToBase(object)
{
    
    var SQLString = "INSERT INTO products (name,amount,price,producer) VALUES ( \'"+object.name+"\', "+object.amount+" , "+object.price+" ,\'"+object.producer+ "\')";
    return new Promise((resolve,reject)=>
    {
    con.query(SQLString,async (err,result)=>
      {
        if (err) throw reject(err);
        resolve(result);
    });
    });
}
function GetAllFromDatabase(all=false){
    var sqlString = "SELECT * FROM products";
    if(all==true){
        sqlString = "SELECT * FROM products";
    }
    return new Promise((resolve,reject)=>
    {
      con.query(sqlString,(err,res)=>{
        if (err) throw reject(err);
        resolve(res);
      });
    });
}
function GetIDFromObject(object){
    var object = JSON.parse(JSONInfo);
    return new Promise((resolve,reject)=>{
    con.query("SELECT * FROM products WHERE name=\""+object.name+"\"and amount ="+object.amount+" and price = "+object.price+" and producer = \""+object.producer+ "\")",
    (err,res)=>{
      if (err) reject(err);
      return resolve(res[0].id);
    });
    });
}
function GetObjectFromDatabase(object){
  var SQLString = "SELECT * FROM products WHERE name=\""+object.name+"\"and amount ="+object.amount+" and price = "+object.price+" and producer = \""+object.producer+ "\")";
  con.query(SQLString,
  function(err,res){
      if (err) throw err;
      return res;
    });
}
function UpgradeObjectInDatabaseByID(object,id){
    return new Promise((resolve,reject)=>{
    var SQLString = "UPDATE products SET name=\""+object.name+"\", amount ="+object.amount+" , price = "+object.price+" , producer = \""+object.producer+ "\" where id = "+id;
    con.query(SQLString,
    (err,res)=>{
      if (err) reject(err);
        resolve({"result":"ok"});
    });
  })
}
function DeleteInfo(JSONInfo)
{
    var object = JSONInfo;
    return new Promise((resolve,reject)=>{
    var SQLString = "DELETE FROM products where id = "+object.id;
    con.query(SQLString,
    (err,res)=>{
      if (err) reject(err);
        resolve({"result":"ok"});
    });
  });
}
app.use(express.json());
app.get("/info",async(req,res)=>{
    await GetAllFromDatabase(true).then(result=>res.json(result),reject=>console.log(reject));
})
app.get("/id",async(req,res)=>{
    var info = req.body;
    await GetIDFromObject(info)
    res.json({id: GetIDFromObject(info)});
})
app.put("/redact",async(req,res)=>{
    var fullObject = req.body;
    await UpgradeObjectInDatabaseByID(fullObject, fullObject.id).then(result=>res.json(result));
})
app.post("/",async (req,res)=>{
    console.log("We had a\n"+req);
    var info = req.body;
    await SendInfoToBase(info).then(result=>{
      res.json(info);console.log(result);},
      rejected=>{console.log(rejected);});
    
})
app.delete("/",async(req,res)=>{
    var info = req.body;
    await DeleteInfo(info).then(result=>res.json(result));
})

app.get("/", function(request, res){
    res.sendFile(__dirname + "/index.html");
    
});
app.get("/styleLab.css", function(req,res){
    res.sendFile(__dirname+"/styleLab.css");
})

app.get("/Client.js", function(req,res){
    res.sendFile(__dirname+"/Client.js");
})
app.listen(3000);
