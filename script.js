const note=document .getElementById("note")
const saveBtn=document.getElementById("save-btn")
const allNotes=document.getElementById("all-notes")

function newNote(){
    const inputNote=note.value.trim()
    if(!inputNote){
alert("Please enter text!")
return
    }
    
    const noteElt=document.createElement("div")
    noteElt.classList.add("note")
    noteElt.textContent=inputNote
    allNotes.appendChild(noteElt)
    note.value=""

    //saving data to localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.push(inputNote)
localStorage.setItem("notes", JSON.stringify(notes));



}
saveBtn.addEventListener("click", newNote)