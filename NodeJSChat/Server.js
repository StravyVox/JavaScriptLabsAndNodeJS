const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 9000 });
var messages = [];
wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    console.log('Новый пользователь');

    wsClient.on('close', function() {
        console.log('Пользователь отключился');
    });

    wsClient.on('message', function(message) {
        console.log(message);
        try {
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'SEND':
                    //messages.push({name:jsonMessage.name, message:jsonMessage.message});
                    console.log("Name is "+jsonMessage.name);
                    console.log("Message is "+jsonMessage.message);
                    messages.push({name:jsonMessage.name,message:jsonMessage.message});
                    wsServer.clients.forEach(client=>{client.send(JSON.stringify({name:jsonMessage.name,message:jsonMessage.message}))});
                    break;
                
                case 'RECVALL':
                    console.log("Call for all messages");
                    try{
                        messages.forEach(message=>{
                            console.log(message.pic);
                            if(message.pic!=null){
                                wsClient.send(JSON.stringify({name:message.name,message:"Send a pic"}));
                                wsClient.send(message.pic);
                            }
                            else
                            {
                            wsClient.send(JSON.stringify({name:message.name,message:message.message}));
                            }
                            
                    });
                    break;
                    }
                    catch{
                        console.log("No messages");
                        break;}
                default:
                        
                    break;
            }
        } catch (error) 
        {
            console.log("Sending a pic");
            messages.push({name:messages[messages.length-1].name,pic:message});
            wsServer.clients.forEach(client=>{client.send(message)});
            
        }
    });
}

console.log('Сервер запущен на 9000 порту');
