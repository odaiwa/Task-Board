/**
 * Clean Form from input
 */
function cleanInput() {
    document.getElementById("input-text").value = ""
    document.getElementById("date-input").value = ""
    document.getElementById("hour-input").value = ""
}

console.log(`All the prints that will appear on the console is for debugging matter.`)
/**
 * Global Vars to get elements from DOM
 */
const textBox = document.getElementById("input-text")
const dataBox = document.getElementById("date-input")
const timeBox = document.getElementById("hour-input")
const tasksBoard = document.getElementById("tasks-board")
let toBeDeleted
let functioncaller = 0
/**
 * Clean all date from LocalStorage
 * also calls cleanInput()
 */
function cleanStorage() {
    cleanInput()
    localStorage.clear()
    document.getElementById("tasks-board").innerHTML = ""
}

function deleteNoteFromLocalStorage(removeNID) {
    console.log(removeNID+ "delete note from local")
    console.log(`Task with id = ${removeNID} is in removing process`)
    const jsonArray = localStorage.getItem("noteList");
    //if (!jsonArray) return;
    const noteList = JSON.parse(jsonArray);
    for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].nid === removeNID) {
            const index = noteList.indexOf(noteList[i]);
            if (index > -1) {
                noteList.splice(index, 1);
            }
        }
    }
    localStorage.removeItem("noteList");
    localStorage.setItem("noteList", JSON.stringify(noteList));
}

function deleteTask(task){
    console.log(`delete note has been called with id ${task.id}`)
    deleteNoteFromLocalStorage(task.id);
    task.style.animation = "fadeOut 1s";
    setTimeout(() => {
        task.remove()
    }, 200);
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
    console.log("saving to localStorage started")
    //UNIQ id for each Note.
    //making uniq id for removal usage
    const nId = uniqIdForNote();
    //note Struct
    const note = {
        nid: nId,
        text: text,
        date: date,
        time: time
    }
    console.log(`the data that will be saved in the localStorage is ${nId} ${text} ${date} ${time}`)
    let noteList = [];
    const jsonArray = localStorage.getItem("noteList")
    if (jsonArray) {
        noteList = JSON.parse(jsonArray)
    }

    noteList.push(note)
    localStorage.setItem("noteList", JSON.stringify(noteList))
    console.log("data has been saved successfully to localStorage")
    return note
}

/**
 * Create UNIQ id for note
 * @param NONE
 */
function uniqIdForNote() {
    let idString = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        const asciiCode = Math.floor((Math.random() * 42) + 48);
        if (asciiCode < 58 || asciiCode > 64) {
            idString += String.fromCharCode(asciiCode);
        }
    } while (idString.length < 32);
    console.log(`uniq id has been created ${idString}`)
    return idString;
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
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentDateStruct = {
        year: parseInt(currentDate.getFullYear()),
        month: parseInt(currentDate.getMonth() + 1),
        day: parseInt(currentDate.getDate())
    }
    const inputDateStruct = {
        year: parseInt(parsedDate[0]),
        month: parseInt(parsedDate[1]),
        day: parseInt(parsedDate[2])
    }
    if (date === "") {
        alert("date cannot be empty\nif you want to add note you must choose date")
        return false;
    }
    if (inputDateStruct.year < currentDateStruct.year) {
        alert("Time cannot be in past")
        return false;
    } else if (inputDateStruct.year === currentDateStruct.year) {
        if (inputDateStruct.month < currentDateStruct.month) {
            alert("month cannot be in past")
            return false;
        } else if (inputDateStruct.month === currentDateStruct.month) {
            if (inputDateStruct.day < currentDateStruct.day) {
                alert("day cannot be in past")
                return false;
            }
        }
    }
    if (text === "") {
        alert("text cannot be empty\nPlease enter some text in the text box")
        return false;
    }

    const [hour, minutes] = time.split(":");
    const [intHour, intMinutes] = [parseInt(hour), parseInt(minutes)];
    if (time === "") {

    } else {

        if (currentHour > intHour) {
            alert(`invalid hour\nhour cannot be in past\n${text}`)
            return false;
        } else if (currentHour == intHour) {
            if (currentMinutes > intMinutes) {
                alert("invalid minute \nminute cannot be in past")
                return false;
            }
        }
    }
    console.log("Validation succeeded ")
    return true;
}
function validateTimeForOnLoad(time) {
    if(time === ""){
        return true
    }
    const currentDate = new Date()
    console.log("deleting duo to invalid time")
    const currentHour = currentDate.getHours()
    const currentMinutes = currentDate.getMinutes()

    const [hour, minutes] = time.split(":");
    const [intHour, intMinutes] = [parseInt(hour), parseInt(minutes)]

    if (currentHour > intHour) {
        alert(`invalid hour\nhour cannot be in past\n`)
        return false;
    } else if (currentHour == intHour) {
        if (currentMinutes > intMinutes) {
            alert("invalid minute \nminute cannot be in past")
            return false;
        }
    }
    return true

}
function validateHourForOnLoad(date) {
    const currentDate = new Date()
    const parsedDate = date.split("-")
    const currentDateStruct = {
        year: parseInt(currentDate.getFullYear()),
        month: parseInt(currentDate.getMonth() + 1),
        day: parseInt(currentDate.getDate())
    }
    const inputDateStruct = {
        year: parseInt(parsedDate[0]),
        month: parseInt(parsedDate[1]),
        day: parseInt(parsedDate[2])
    }
    if (inputDateStruct.year < currentDateStruct.year) {
        console.log("rejected from hour validator")
        return false
    }
    else if (inputDateStruct.year === currentDateStruct.year) {
        if (inputDateStruct.month < currentDateStruct.month) {
            console.log("rejected from hour validator")
            return false
        }
        else if (inputDateStruct.month === currentDateStruct.month) {
            if (inputDateStruct.day < currentDateStruct.day) {
                console.log("rejected from hour validator")

                return false
            }
        }
    }
    return true
}
function addTaskToBoard() {
    const noteText = textBox.value
    const noteDate = dataBox.value
    const noteTime = timeBox.value
    if (validation(noteText, noteDate, noteTime, "add task to board")) {
        const successTask = saveNoteToLocalStorage(noteText, noteDate, noteTime)
        creatNoteElement(successTask)
        showTaskonBoard(successTask)
        cleanInput()
    }

}
/**
 * Function that adds the task to the board
 * @param task objectTask
 */
function showTaskonBoard(task) {
    const taskDiv = document.createElement("Div")
    taskDiv.className = "task"
    taskDiv.id = task.nid
    const glyphDeleteIcon = document.createElement("i")
    glyphDeleteIcon.classList.add("far","fa-window-close")
    glyphDeleteIcon.setAttribute("onclick", `deleteTask(${task.nid})`)
    taskDiv.appendChild(glyphDeleteIcon)
    
    const taskText = document.createElement("Div")
    taskText.className = ("task-text")
    task.text = task.text.replaceAll("\n", "<br>")
    taskText.innerHTML = task.text
    taskDiv.appendChild(taskText)

    const taskFooter = document.createElement("Div")
    taskFooter.classList.add("task-footer")
    taskFooter.innerHTML = `${task.date}<br>${task.time}`
    taskDiv.appendChild(taskFooter)

    tasksBoard.appendChild(taskDiv)
}

function onload() {
    const jsonArray = localStorage.getItem("noteList")
    if (!jsonArray) return
    const notes = JSON.parse(jsonArray)
    let taskOnBoard = ""
    for (const task of notes) {
        taskOnBoard += creatNoteElement(task)
    }
    tasksBoard.innerHTML += taskOnBoard
}


function creatNoteElement(task) {
    const taskID = task.nid
    if (validateHourForOnLoad(task.date) && validateTimeForOnLoad(task.time)) {
        task.text = task.text.replaceAll("\n", "<br>"); //FOR ADDING NEW LINE
        console.log(taskID+"from create ")
        return `
            <div class="task" id="${task.nid}">
                <i class="far fa-window-close" onclick="deleteTask(${taskID})" ></i>
                <div class="task-text">
                    ${task.text}
                </div>
                <div class="task-footer">
                    ${task.date}
                    <br>
                    ${task.time}    
                </div>
            </div>`
    } 
    else {
        deleteNoteFromLocalStorage(taskID)
        return ""
    }
}
onload()