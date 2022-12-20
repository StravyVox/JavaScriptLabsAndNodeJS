class Info{
    constructor(index,name){
        this.name = name;
        this.index = index;
    }
}
var inputInfo = "RG";
var outputInfo = "RR";
var app = new Vue({
    el: '#app',
    data: {
        input :0,
        inputValue:'',
        outputValue:'',
        inputS:'',
        outputS:'',
        info:[],
        Description:'',
        index:0,
    },
    mounted(){
        if(localStorage.getItem('info')){
            try{
                this.info = JSON.parse(localStorage.getItem('info'));
                this.index = this.info.length;
                MakeAList(this.info);
            }
            catch(error){
                localStorage.removeItem('info');
            }
        }
    },
    methods: {
        ConvertInfo: function(value,firstIndex = 0,lastIndex = 0){
            var result = Convert(value,firstIndex,lastIndex);
            try{
                this.inputS = this.$refs.inputSize.options[this.$refs.inputSize.selectedIndex].text;
                this.outputS = this.$refs.outputSize.options[this.$refs.outputSize.selectedIndex].text;
            }
            catch{
                
                
            }
            return result;
        },
        AddInfo(){
            if(!this.Description){
                return;
            }
            if(this.info.length==0){
                this.index = 0;
            }
            var info = new Info(this.index,this.Description);
            this.info.push(info);
            this.Description='';
            this.index++;
            this.SaveInfo();
            MakeAList(this.info);
        },
        SaveInfo(){
            const parsed = JSON.stringify(this.info);
            localStorage.setItem('info',parsed);
        },
        RedactInfo: function(id){   
            var index = parseInt(id);
            var info = prompt("Введите новое значение");
            if(info!=null){
                var info = new Info(index,info);
                this.info[index] = info;
                this.SaveInfo();
                MakeAList(this.info);
            }   
        },
        DeleteInfo: function(id){
            var index = parseInt(id);
            this.info.splice(index,1);
            for(i = 0 ;i<this.info.length;i++){
                this.info[i].index =i;
            }
            this.SaveInfo();
            MakeAList(this.info);
        }
    }
})
function RedactInfo(id){app.RedactInfo(id)}
function DeleteInfo(id){app.DeleteInfo(id)}
function MakeAList(massInfo){
    var infoObject = document.getElementById('InfoAbout');
    infoObject.innerHTML = "";
    massInfo.forEach(element => {
        var InfoElement = document.createElement("div");
        var InfoAbout = document.createElement("p");
        var deleteButton = document.createElement("button");
        
        var currentID = element.index;

        InfoAbout.innerText = element.index + ". " + element.name;
        InfoAbout.setAttribute("onClick","RedactInfo(\""+currentID+"\")");
        InfoAbout.setAttribute("class","ToDoElement");
        deleteButton.setAttribute("onClick","DeleteInfo(\""+currentID+"\")");
        deleteButton.setAttribute("class","DeleteButton");
        deleteButton.innerText = "Удалить";
        InfoElement.setAttribute("class","infoElement");
        InfoElement.appendChild(InfoAbout);
        InfoElement.appendChild(deleteButton);
        infoObject.appendChild(InfoElement);
    });
    window.navigator.vibrate([150,150]);
}
function Convert(value,firstIndex, lastIndex){
    var amount = parseInt(firstIndex)-parseInt(lastIndex);
    value = parseFloat(value);
    //console.log("Value: "+value);
    //console.log("FirstIndex: "+firstIndex);
    //console.log("LastIndex: "+lastIndex);
    amount = parseInt(amount);
    //console.log("Amount: "+amount);
    if(amount>0){
            for(var i = 0; i<amount;i++){
                value = value*1024;
            }
            //console.log("Returning value:"+value);
            return value;
        }
    else if(amount<0){
            amount*=-1;
            for(var i = 0; i<amount;i++){
                value = value/1024;
            }
            //console.log("Returning value:"+value);
            return value;
        }
    else{
            //console.log("Returning value:"+value);
            return value;
        }
    console.log("No switch");
}