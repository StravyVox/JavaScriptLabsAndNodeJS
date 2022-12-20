function firsttask(){
    var buttonelement = document.getElementsByClassName("button")[0];
    var divelement = document.getElementById("task1");
    var interinfoelement = document.createElement("input");
    
    buttonelement.setAttribute("onclick", "appendfirsttask()")
    buttonelement.setAttribute("value", "Выполнить задание")
    interinfoelement.setAttribute("placeholder", "Второе с конца слова");
    interinfoelement.setAttribute("type", "text");
    interinfoelement.setAttribute("maxlength", "200");
    interinfoelement.setAttribute("class", "inputText");
    divelement.appendChild(interinfoelement);
}
function secondtask(){
    var buttonelement = document.getElementsByClassName("button")[1];
    var divelement = document.getElementById("task2");
    var interinfoelement = document.createElement("input");
    
    buttonelement.setAttribute("onclick", "appendsecondtask()")
    buttonelement.setAttribute("value", "Выполнить задание")
    
    interinfoelement.setAttribute("placeholder", "Анаграммы");
    interinfoelement.setAttribute("type", "text");
    interinfoelement.setAttribute("maxlength", "200");
    interinfoelement.setAttribute("class", "inputAnagram");

    divelement.appendChild(interinfoelement);

    var interinfoelement = document.createElement("input");
    interinfoelement.setAttribute("type", "text");
    interinfoelement.setAttribute("maxlength", "200");
    interinfoelement.setAttribute("class", "inputAnagram");
    divelement.appendChild(interinfoelement);
}
function thirdtask(){
    var buttonelement = document.getElementsByClassName("button")[2];
    var divelement = document.getElementById("task3");
    var interinfoelement = document.createElement("input");

    buttonelement.setAttribute("onclick", "appendthirdtask()")
    buttonelement.setAttribute("value", "Выполнить задание")
    interinfoelement.setAttribute("type", "text");
    interinfoelement.setAttribute("placeholder", "Удаление гласных");
    interinfoelement.setAttribute("maxlength", "200");
    interinfoelement.setAttribute("class", "inputGlas");

    divelement.appendChild(interinfoelement);

}
function forthtask(){
    var buttonelement = document.getElementsByClassName("button")[3];
    var divelement = document.getElementById("task4");
    var interinfoelement = document.createElement("input");

    buttonelement.setAttribute("onclick", "appendforthtask()")
    buttonelement.setAttribute("value", "Выполнить задание")
    interinfoelement.setAttribute("type", "text");
    interinfoelement.setAttribute("placeholder", "Случайные числа");
    interinfoelement.setAttribute("maxlength", "200");
    interinfoelement.setAttribute("class", "inputRand");

    divelement.appendChild(interinfoelement);
}
function fifthtask(){
    var buttonelement = document.getElementsByClassName("button")[4];
    var divelement = document.getElementById("task5");
    var interinfoelement = document.createElement("input");

    buttonelement.setAttribute("onclick", "appendfifthtask()")
    buttonelement.setAttribute("value", "Выполнить задание")
    interinfoelement.setAttribute("type", "text");
    interinfoelement.setAttribute("placeholder", "Случайный набор латинских букв");
    interinfoelement.setAttribute("maxlength", "200");
    interinfoelement.setAttribute("class", "inputRandLat");

    divelement.appendChild(interinfoelement);
}

function appendfifthtask(){
    var inputText = document.getElementsByClassName("inputRandLat")[0];
    var alphabet = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
    var str = "";
    for(var a = 0; a<=50;a++){
        var c = getRandomInt(0,alphabet.length-1);
        str+=alphabet[c];
        str+=" ";
    }
    inputText.value = str;
}
function appendforthtask(){
    var inputText = document.getElementsByClassName("inputRand")[0];
    var str = ""
    for(var a = 0; a<=50;a++){
        var c = getRandomInt(100,200);
        str+=c.toString()+" ";
    }
    inputText.value = str;
}
function appendthirdtask(){
    var inputText = document.getElementsByClassName("inputGlas")[0];
    var text = inputText.value.toLowerCase();
    var glas = ["у","е", "ы","а","о", "э", "я", "и", "ю", "ё"];
    var result = [];
    var words = text.split("");
    glas.forEach(elem=>{
        var index = words.indexOf(elem);
        if(index!=-1){
        words.splice(index,1);}

    })
    words.forEach(ch =>{
        result+=ch;
    })
    inputText.value = result.toString();
}
function appendfirsttask(){
    var inputText = document.getElementsByClassName("inputText")[0];
    var text = inputText.value;
    var words = text.split(" ");
    var word = words[words.length - 2];
    inputText.value = word;
}
function appendsecondtask(){
    var inputTextfirst = document.getElementsByClassName("inputAnagram")[0].value.toLowerCase();
    var inputTextsecond = document.getElementsByClassName("inputAnagram")[1].value.toLowerCase();
    inputTextfirst = inputTextfirst.split("");
    inputTextsecond = inputTextsecond.split("");
    var bool = true;
    inputTextfirst.forEach(element => {
        if(!inputTextsecond.includes(element))
        {
            bool = false;
        }
    });
    if(bool)
    {
        alert("Две строки являются анаграммами друг друга");
    }
    else{
        alert("Две строки не являются анаграммами друг друга");
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}