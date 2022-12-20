var filePicker;
var preview;
var student;
class Student{
    constructor(name,surname,lastname,faculty,speciality, labs = []){
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.faculty = faculty;
        this.speciality = speciality;
        this.Labs = labs;
    };
    
    AddLab(Lab){
        this.Labs.push(Lab);
    }
    ShowLab(){
        let info = "";
        this.Labs.forEach(lab => {
            info+=lab.Info();
        })
        return info;
    }
    ConvertToJSON(){
        let jsonElement = JSON.stringify(this);
        return jsonElement;
    }
}
class Lab{
    constructor(name,data,mark){
        this.name = name;
        this.data = data;
        this.mark = mark;
    }
    Info(){
        let info = "";
        info+="<br>" + this.name + " " +this.data+ " " +this.mark+ " ";
        return info;
    }
}
function makeJson(){
    var Mike = new Student("Mike", "Altonio", "Gustavo's","FAIS","HR");
    Mike.AddLab(new Lab("FrontEnd",2022,"10"));
    Mike.AddLab(new Lab("FrontEnd",2023,"5"));
    Mike.AddLab(new Lab("FrontEnd",2024,"5"));
    var JsonMike = Mike.ConvertToJSON();
    console.log(JsonMike);
    var convertedMike = JSON.parse(JsonMike);
    convertedMike = ConvertJson(convertedMike);
    console.log(convertedMike.ShowLab());
}

function Connect(){
    filePicker = document.getElementById("FilePicker");
    preview = document.getElementById("task1");
    filePicker.addEventListener('change',updateFile);
}
function ConvertJson(JSONobject){
    Labs = []
    JSONobject.Labs.forEach(lab =>{
        var labBuff = new Lab(lab.name, lab.data, lab.mark);
        Labs.push(labBuff);
    })
    student = new Student(JSONobject.name,JSONobject.surname,JSONobject.lastname,JSONobject.faculty,JSONobject.speciality, Labs);
    alert(student.name+student.ShowLab());
}
function updateFile(){
    var curFile = filePicker.files[0];
    
    parseJsonFile(curFile).then(info => ConvertJson(info)).catch(error => console.log(error));
}
function FindByDate(){
    var date = prompt("Дата?");
    var infoabout = document.getElementById("task2");
    FindBy(date).then(stringInfo => {infoabout.innerHTML=stringInfo}).catch(error=>{alert(error)})
}
async function FindBy(data){
    return new Promise((resolve, reject) =>{
        str = ""
        student.Labs.forEach(lab => {
            if(parseInt(lab.data) >= parseInt(data)){
                str+=lab.Info();
            }
        });
        if(str == ""){
            reject("Нету нахождений");
        }
        else{
            resolve(str);
        }
    })
}
async function parseJsonFile(file, callback) 
{
        return new Promise
        (
            (resolve, reject) => 
            {
                const fileReader = new FileReader()
                fileReader.onload = event => resolve(JSON.parse(event.target.result))
                fileReader.onerror = error => reject(error)
                fileReader.readAsText(file)
            }
        )
}