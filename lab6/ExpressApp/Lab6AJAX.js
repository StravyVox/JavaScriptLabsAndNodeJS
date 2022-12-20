
class Student{
    constructor(name,surname,lastname,faculty,speciality,index){
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.faculty = faculty;
        this.speciality = speciality;
        this.index = index
    };
    ConvertToJSON(){
        let jsonElement = JSON.stringify(this);
        return jsonElement;
    }
    InfoAbout(){
        let str = "Student: "+this.name+" "+this.surname+" "+this.lastname+" studying on "+this.speciality+" from "+this.faculty;
        return str;
    }
}
function Redact(){
   SendStudent("/redact");
}
function SendStudent(info){
      // получаем данные формы
   var inputMass = document.getElementsByClassName("inputText");
   var student = new Student(inputMass[0].value,inputMass[1].value,inputMass[2].value,inputMass[3].value,inputMass[4].value,inputMass[5].value);
   // сериализуем данные в json
   student = student.ConvertToJSON();
   fetch(info,{method:"POST",headers: { "Accept": "application/json", "Content-Type": "application/json" },body:student})
   .then(response=>response.text())
   .then(responseText=>alert(responseText));
   /*let request = new XMLHttpRequest();
   // посылаем запрос на адрес "/user"
    request.open("POST", info, true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
       // получаем и парсим ответ сервера
        alert(request.response);
    });
    request.send(student);*/
}
function Delete(){
   SendStudent("/delete");
}
function Add(){
   SendStudent("/user");
};
function RecieveInfo(){
      // получаем данные формы
   var inputMass = document.getElementsByClassName("inputText");
   var student = new Student(inputMass[0].value,inputMass[1].value,inputMass[2].value,inputMass[3].value,inputMass[4].value,inputMass[5].value);
   // сериализуем данные в json
   student = student.ConvertToJSON();
    let request = new XMLHttpRequest();
    request.open("POST", "/info", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
       var result = request.response;
       result = JSON.parse(result);
       if(result=="Error"){
            alert("Нету такого студента");
            
       }
       else{
       
       result = ConvertFromJson(result);
       inputMass[0].value = result.name;
       inputMass[1].value = result.surname;
       inputMass[2].value = result.lastname;
       inputMass[3].value = result.faculty;
       inputMass[4].value = result.speciality;
       inputMass[5].value = result.index;
    }
    });
    request.send(student);   
};
function ConvertFromJson(JSONobject){
    var student = new Student(JSONobject.name,JSONobject.surname,JSONobject.lastname,JSONobject.faculty,JSONobject.speciality, JSONobject.index);
    return student;
}
function AmountOfStudents(){
    var request = new XMLHttpRequest();
    request.open("POST", "/amount",true);
    request.addEventListener("load", ()=>{
        alert(request.response);
    });
    request.send();
}
/*function AddPeople(){
    var arrayhtml = document.getElementsByClassName("peopleArray");
    var studentElement = document.createElement("")
}*/