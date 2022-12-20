function firsttask(){
  var baseline = document.getElementsByName("inputText1")[0];
  var codeline = document.getElementsByName("inputText1")[1];
  var sumline = document.getElementsByName("inputText1")[2];
  lettersFunction(baseline,codeline,sumline);
}
function secondtask(){
  var minline = document.getElementsByName("inputText2")[0];
  var maxline = document.getElementsByName("inputText2")[1];
  var resline = document.getElementsByName("inputText2")[2];
  var sortline = document.getElementsByName("inputText2")[3];
  getRandom(minline,maxline,resline,sortline);
}
function thirdtask(){
  var array = document.getElementsByName("inputText3")[0];
  var mathline = document.getElementsByName("inputText3")[1];
  var garmline = document.getElementsByName("inputText3")[2];
  getArray(array,mathline,garmline);
}
function forthtask(){
  getPeople();
}
function lettersFunction(baseline,codeline,sumline){
    var arr = [];
    var latinitsa = "abcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 13; i++) {
      arr.push(latinitsa[Math.floor(Math.random() * (latinitsa.length - 1 + 1)) + 1]);
    }
    
  
    var arrUp = arr.join(" ").toUpperCase();
    baseline.setAttribute("value",arrUp);
    lettersCode(arrUp,codeline,sumline);
  }
  function lettersCode(arrUp,codeline,sumline){
    arrUp = arrUp.replace(/\s+/g, '');
    var arr_codes = [];
    for (var i = 0; i < arrUp.length; i++) {
      arr_codes.push(arrUp[i].charCodeAt());
    }
    codeline.setAttribute("value",arr_codes);
  
    codesFive(arr_codes,sumline);
  }
  function codesFive(arr_codes,sumline) {
    var sum = 0;
    var temp = [];
    for (var i = 0; i < arr_codes.length; i++) {
      if (arr_codes[i]%5 != 0) {
        temp.push(arr_codes[i]%5);
        sum += arr_codes[i]%5;
      }
    }
    console.log(temp);
    sumline.setAttribute("value",sum);
  }
  
  function getRandom(minline,maxline,resline,sortline) {
    var arr = [];
    var min = Math.ceil(minline.value);
    var max = Math.ceil(maxline.value);
    for (var i = 0; i < 15; i++) {
      arr.push(Math.floor(Math.random() * (max - min) + min));
    }
    resline.setAttribute("value",arr);
  
    for (var i = 0; i < arr.length-1; i++) {
      for (var j = 0; j < arr.length-1-i; j++) {
        if (arr[j]%10<arr[j+1]%10) {
          temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
    sortline.setAttribute("value",arr);
  }
  
  function getArray(array,mathline,garmArray) {
    var arr = []
    for (var i = 0; i < 17; i++) {
      arr.push(Math.floor(Math.random() * (50 - 1) + 1))
    }
    array.setAttribute("value",arr);
    var sum = 0;
    var sum1 = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
      sum1 += 1/arr[i];
    }
    var arif = sum/17;
    var garm = arr.length/sum1;
    mathline.setAttribute("value",arif);
    garmArray.setAttribute("value",garm);
  
  }
  
  
  function getPeople() {
    var arrNames = ['Алёна','Татьяна','Евгений','Дмитрий','Илья','Анастасия','Алеся','Виктор','Виталий','Анна','Станислав','Мария','Сергей','Яна','Никита','Александр','Александра','Владимир','Юрий','Дарья'];
    var arrPeople = [];
    for (var i = 0; i < arrNames.length; i++) {
      arrPeople[i] = {
        name: arrNames[Math.floor(Math.random() * (20 - 1) + 1)],
        age: Math.floor(Math.random() * (30 - 1) + 1)
      }
    }
    printPeople(arrPeople);
  }
  
  function declination(age) {
    console.log(age + 'лет.');
    var decl = '';
    if (age>=10 && age<=20) {
      decl = age + ' лет.';
      return decl;
    }
    if (age == 1 || age%10 == 1) {
      decl = age + ' год.';
      return decl;
    }
    if (age>=2 && age<=4){
      decl = age + ' года.';
      return decl;
    }
    if (age%10>=2 && age%10<=4) {
      decl = age + ' года.';
      return decl;
    }
    else {
      decl = age +' лет.';
      return decl;
    }
  
  }
  
  function printPeople(arrPeople) {
    var str = '';
    for (var i = 0; i < arrPeople.length; i++) {
      str += '<br>' + 'Меня зовут ' + arrPeople[i].name + '. Мне ' + declination(arrPeople[i].age);
    }
    document.getElementById('peopleArray').innerHTML = str;
  }
  