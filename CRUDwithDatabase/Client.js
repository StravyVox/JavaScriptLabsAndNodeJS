
class Product{
    constructor(name, amount,price,producer){
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.producer = producer;
    };
    ConvertToJSON(){
        let jsonElement = JSON.stringify(this);
        return jsonElement;
    }
}
function SendProduct(){
      // получаем данные формы
   var inputMass = document.getElementsByClassName("inputText");
   var product = new Product(inputMass[0].value,inputMass[1].value,inputMass[2].value,inputMass[3].value);
   fetch("/",{method:"POST",headers: {"Content-Type": "application/json" },body:JSON.stringify(product)})
   .then(async response=>{
        await response.json().then(result=>AddObject(result));
   });
}
function GetObjects(){
    Clear();
    fetch("/info",{method:"GET",headers:{"Content-Type": "application/json"}})
    .then(async response=>{
        await response.json().then(result=>
        {result.forEach(element => 
            {
            AddObject(element);
            }); 
        });
    })
}
function GetIDFromObject(object){
    fetch("/id",{method:"GET",headers:{"Content-Type": "application/json"},body:JSON.stringify(object)})
    .then(async response=>{
        await response.json().then(result=>
        {
            return result.id;
        });
    })

}
function Delete(id){
    var object = new Object();
    object.id = id
    fetch("/",{method:'DELETE',headers:{"Content-Type": "application/json"},body:JSON.stringify(object)})
    .then(async response=>{
        await response.json().then(result=>{
            if(result.result=="ok"){
                Clear();
                GetObjects();
            }
        })
    })
}
function Clear(){
    var result = [].slice.call(document.getElementsByClassName("InfoElement"));
    result.forEach(element=>{
        element.remove();
    });
    if(button = document.getElementById("redactButton")){
        button.remove();    
    }
}
function Redact(id)
{
   var inputMass = document.getElementsByClassName("inputText");
    var product = new Product(inputMass[0].value,inputMass[1].value,inputMass[2].value,inputMass[3].value);
    product.id = id;
    fetch("/redact",{method:'PUT',headers:{"Content-Type": "application/json"},body:JSON.stringify(product)})
    .then(async response=>{
        await response.json().then(result=>{
            if(result.result=="ok"){
                Clear();
                GetObjects();
            }
        })
    })
}
function RedactElement(element,id){
    var elements = element.getElementsByClassName("LiElem");
    var application = document.getElementsByClassName("app")[0];
   var inputMass = document.getElementsByClassName("inputText");
    inputMass[0].value = elements[0].innerHTML;
    inputMass[1].value = elements[1].innerHTML;
    inputMass[2].value = elements[2].innerHTML;
    inputMass[3].value = elements[3].innerHTML;
    var product = new Product(inputMass[0].value,inputMass[1].value,inputMass[2].value,inputMass[3].value);
    if(button = document.getElementById("redactButton")){
        button.remove();    
    }
    createButton("Redact("+id+")",application,"Redact","button","redactButton");

}
function AddObject(object){
    var ShowElement = document.getElementById("ShowElement");
    var InfoElement = document.createElement("div");
    InfoElement.setAttribute("class","InfoElement");
    InfoElement.setAttribute("onclick","RedactElement(this,"+object.id+")");
    var ul = document.createElement('ul');
    createLIElem(object.name,ul);
    createLIElem(object.price,ul);
    createLIElem(object.amount,ul);
    createLIElem(object.producer,ul);
    var liElem = document.createElement('li');
    createButton("Delete("+object.id+")",liElem,"Delete","deleteButton","delBut");
    ul.appendChild(liElem);
    InfoElement.appendChild(ul);
    ShowElement.appendChild(InfoElement);
}
function createLIElem(text,parent){
    var liElem = document.createElement('li');
    liElem.setAttribute("class","LiElem");
    liElem.innerHTML = text;
    parent.appendChild(liElem);
}
function createButton(textClick,parent,value,buttonClass,id){
    
    var buttonElement = document.createElement('input');
    buttonElement.setAttribute("type","button");
    buttonElement.setAttribute("class",buttonClass);
    buttonElement.setAttribute("value",value);
    buttonElement.setAttribute("onclick",textClick);
    buttonElement.setAttribute("id",id);
    parent.appendChild(buttonElement);
}