function cleanInput() {
    document.getElementById("input-text").value = ""
    document.getElementById("date-input").value = ""
    document.getElementById("hour-input").value = ""
}

const dataBox = document.getElementById("dateInput")
const houtBox = document.getElementById("hourInput")
//const addTask = document.getElementById("addTask")

/*
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
    } else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}
*/

function cleanStorage(){
    localStorage.clear();
}

function addToLocalStorage(){
    const dataBox = document.getElementById("dateInput")
    const houtBox = document.getElementById("hourInput")

}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

//showTasks();


function saveToLocalStorage(noteText, noteDate, noteTime) {

    // giving each note a unique id so it can be used later,e.g.:removal of the note. 
    const noteId = createId();

    const note = {
        nid: noteId,
        body: noteText,
        date: noteDate,
        time: noteTime
    }

    let notes = [];
    const jsonArray = localStorage.getItem("notes");
    if (jsonArray) {
        notes = JSON.parse(jsonArray);
    }

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    return note;

}

/*
function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
    if (listArray.length > 0) { //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}
*/

function addTask(){
    const img = document.createElement("img")
    const span1 = document.getElementById("tasks")
    img.src="/assets/images/notebg.png"
    span1.appendChild(img)

}