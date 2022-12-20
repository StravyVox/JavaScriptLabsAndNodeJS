const myWs = new WebSocket('ws://localhost:9000');
var filePicker = document.getElementById("FilePicker");
var fileCheck = false;

// обработчик проинформирует  в консоль когда соединение установится
myWs.onopen = function () {
  myWs.send(JSON.stringify({action: 'RECVALL'}));
  filePicker.addEventListener('change',()=>fileCheck=true);
};
// обработчик сообщений от сервера
myWs.onmessage = function (message) {
  console.log(message);
  var Chat = document.getElementById("Chat");
  //alert(message.data);
  try{
  var info = JSON.parse(message.data);
  var NameInfo = document.getElementById("NameInfo").value;
  if(info.name == NameInfo){
    var messageBox = document.createElement("div");
    var name = document.createElement("p");
    var message = document.createElement("p");
    messageBox.setAttribute("class","OwnMessageBox");
    name.setAttribute("class","Name");
    message.setAttribute("class","Message");
    name.innerHTML = info.name;
    message.innerHTML = info.message;
    messageBox.appendChild(name);
    messageBox.appendChild(message);
    Chat.appendChild(messageBox);
  }
  else{
    var messageBox = document.createElement("div");
    var name = document.createElement("p");
    var message = document.createElement("p");
    messageBox.setAttribute("class","MessageBox");
    name.setAttribute("class","Name");
    message.setAttribute("class","Message");
    name.innerHTML = info.name;
    message.innerHTML = info.message;
    messageBox.appendChild(name);
    messageBox.appendChild(message);
    Chat.appendChild(messageBox);
  }
  }
  catch{
    var messageBox = document.createElement("div");
    Chat.appendChild(messageBox);

    var reader = new FileReader();
    var rawData = new ArrayBuffer();            
  
    reader.onload = function(e) {
        rawData = e.target.result;
        var arrayBufferView = new Uint8Array( rawData );
        var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL( blob );
        var img = document.createElement("img");
        img.setAttribute("class","Image")
        img.src = imageUrl;
        messageBox.appendChild(img);
        //alert("the File has been transferred.")
    }
    reader.readAsArrayBuffer(message.data);
  }
};
// функция для отправки echo-сообщений на сервер
function wsSendEcho(nameValue, messageValue) {
  myWs.send(JSON.stringify({action: 'SEND', name: nameValue,message:messageValue}));
}
function Send(){
    var NameInfo = document.getElementById("NameInfo").value;
    var Message = document.getElementById("Message").value;
    if(fileCheck == true){
      //wsSendEcho(NameInfo,"Send a pic");
      sendFile();
    }
    else{
    wsSendEcho(NameInfo,Message);
  }
}
function sendFile() {
  
  var reader = new FileReader();
  var rawData = new ArrayBuffer();            


  reader.onload = function(e) {
      rawData = e.target.result;
      myWs.send(rawData);
      //alert("the File has been transferred.")
  }
  reader.readAsArrayBuffer(filePicker.files[0]);
  
}