/**
 * Clean Form from input
*/
function cleanInput() {
    document.getElementById("input-text").value = ""
    document.getElementById("date-input").value = ""
    document.getElementById("hour-input").value = ""
}
/**
 * Global Vars to get elements
*/
const textBox = document.getElementById("input-text")
const dataBox = document.getElementById("date-input")
const timeBox = document.getElementById("hour-input")


/**
 * Clean all date from LocalStorage
*/
function cleanLocalStorage() {
    cleanInput();
    localStorage.clear();
}



/**
 * Save note to LocalStorage
 * Makes a uniq id for each note add this id to note struct, and then we add text of the note date of the note and time of the note
 * then we add it to the LocalStorage.
 * @param string text - inner value of the note
 * @param date date - expiration date of the note
 * @param time time - (optional) expiration hour of the Task
 */
function saveNoteToLocalStorage(text, date, time) {
    //UNIQ id for each Note.
    //making uniq id for removal usage
    const nId = uniqIdForNote();
    //note Struct
    const note = {
        nid: nId,
        body: text,
        date: date,
        time: time
    }

    let noteList = [];
    const jsonArray = localStorage.getItem("notes")
    if (jsonArray) {
        noteList = JSON.parse(jsonArray)
    }

    noteList.push(note)
    localStorage.setItem("noteList", JSON.stringify(noteList))
    return note
}

/**
 * Create UNIQ id for note
 * @param NONE
*/
function uniqIdForNote() {
    const idString = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        const asciiCode = Math.floor((Math.random() * 42) + 48);
        if (asciiCode < 58 || asciiCode > 64) {
            idString += String.fromCharCode(asciiCode);
        }
    } while (idString.length < 32);

    return idString;
}


function addTask() {
    const img = document.createElement("img")
    const span1 = document.getElementById("tasks")
    img.src = "/assets/images/notebg.png"
    span1.appendChild(img)
}

/**
 * Note Validator (text,date,time)
 * Validate that the text is note empty, or it's contains white spaces in the beginning 
 * date is note empty or it's not in the past
 * time is note in the past
 * @param text string
 * @param date date
 * @param time time
*/
function validation(text, date, time) {
    const currentDate = new Date()
    const parsedDate = date.split("-")
    const currentDateStruct={
        year: parseInt(currentDate.getFullYear()),
        month: parseInt(currentDate.getMonth() + 1),
        day: parseInt(currentDate.getDate())
    }
    const inputDateStruct={
        year: parseInt(parsedDate[0]),
        month: parseInt(parsedDate[1]),
        day: parseInt(parsedDate[2])        
    }
    if (text === "") {
        alert("text cannot be empty\nPlease enter some text in the text box")
        return;
    }
    if (date === ""){
        alert("date cannot be empty\nif you want to add note you must choose date")
    }


}
function addTaskToBoard() {
    const noteText = textBox.value
    const noteDate = dataBox.value
    const noteTime = timeBox.value

    validation(noteText, noteDate, noteTime)

}
