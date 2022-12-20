class Book{
  constructor(name, data,author){
    this._name = name;
    this._data = data;
    this._author = author;
  }
  displayInfo(){
    var info = "This book \""+this.getName()+"\" was created in "+this.getData()+" by "+this.getAuthor()+".";
    return info;
  }
  getAuthor(){
    return this._author;
  }
  getData(){
    return this._data;
  }
  getName(){
    return this._name;
  }
}
class ThemedBook extends Book{
  constructor(name,data,author,theme){
    super(name,data,author);
    this._theme = theme;
  }
  getTheme(){
    return this._theme;
  }
}
class SportThemedBook extends ThemedBook{
  constructor(name,data,author){
    super(name,data,author,"Sport");
  }
  displayInfo(){
    var info = "This sport book \""+this.getName()+"\" was created in "+this.getData()+" by "+this.getAuthor()+".";
    return info;
  }
}
class CookingThemedBook extends ThemedBook{
  constructor(name,data,author){
    super(name,data,author,"Cooking");
  }
  displayInfo(){
    var info = "This cooking book \""+this.getName()+"\" was created in "+this.getData()+" by "+this.getAuthor()+".";
    return info;
  }
}
class TechnicalThemedBook extends ThemedBook{
  constructor(name,data,author){
    super(name,data,author,"Technical");
  }
  displayInfo(){
    var info = "This technical book \""+this.getName()+"\" was created in "+this.getData()+" by "+this.getAuthor()+".";
    return info
  }
}
class Library{
  _books = [];
  constructor(){
    this._books = [];
  }
  AddBook(book){
    this._books.push(book);
  }
  Sort(){
    this._books = this._books.sort((a,b) => a.getName() > b.getName()? 1 : -1);
  }
  GetBooks(){
    return this._books;
  }
}
let library = new Library();
function Input(){
  var buttons = document.querySelectorAll("div.radioButtons input");
  var index = 0;
  var resindex = 0;

  buttons.forEach(button =>{
      if(button.checked == false){
        index++;
      }
      else{
        resindex = index;
      }
  });

  var name = prompt("Имя?");
  var author = prompt("Автор?");
  var data = prompt("Дата создания?");

  switch(resindex){
    case 0:
      var book = new SportThemedBook(name,data,author);
    break;
    case 1:
      var book = new CookingThemedBook(name,data,author);
    break;
    case 2:
      var book = new TechnicalThemedBook(name,data,author);
    break;
    case 3:
      theme = prompt("Тема книги?");
      var book = new ThemedBook(name,data,author,theme);
     break;
  }
  library.AddBook(book);
}
function Sort(){
  library.Sort();
}
function ShowBooks(){
  var text = document.getElementById("TextBooks");
  var str = '';
  var books = library.GetBooks();
  books.forEach(book => {
    str += '<br>' + book.displayInfo();
  });
  text.innerHTML = str;
}
function FindBook(){
  var buttons = document.querySelectorAll("div.checkboxButtons input");
  var filters = ["Name", "Author", "Data"];
  var indexes = [];
  for(var i = 0;i<buttons.length;i++ ){
    if(buttons[i].checked == true){
      indexes.push(i);
    }
  }
  var books = library.GetBooks();
  indexes.forEach(element => {
    books = FindBy(filters[element],books);
  });
  if(books.length==0){
    alert("Таких книг нет");
  } 
  else{
    var text = document.getElementById("TextBooks");
    var str = '';
    books.forEach(book => {
    str += '<br>' + book.displayInfo();
  });
  text.innerHTML = str;
  }
}
function FindBy(argument, array){
  switch(argument){
    case "Name":
      var name = prompt("Название книги?");
      array = FindBookByName(name, array);
      break;
    case "Author":
      var author = prompt("Автор книги?");
      array = FindBookByAuthor(author,array);
      break;
    case "Data":
      var data = prompt("Дата издания книги?");
      array = FindBookByData(data,array);
      break;
  }
  return array;
}
function FindBookByName(name,array){
  var result = [];
  array.forEach(element => {
    if(element.getName() == name){
      result.push(element);
    }
  });
  return result;
}
function FindBookByAuthor(author,array){
  var result = [];
  array.forEach(element => {
    if(element.getAuthor() == author){
      result.push(element);
    }
  });
  return result;
}

function FindBookByData(data,array){
  var result = [];
  array.forEach(element => {
    if(element.getData() == data){
      result.push(element);
    }
  });
  return result;
}