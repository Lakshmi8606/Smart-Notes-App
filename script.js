const note=document .getElementById("note")
const saveBtn=document.getElementById("save-btn")
const allNotes=document.getElementById("all-notes")

function renderNote(text){
    const noteElt=document.createElement("div")
    noteElt.classList.add("note")
    noteElt.textContent=text
    allNotes.appendChild(noteElt)
}
function loadNotes(){
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach(renderNote)
}
//Function to add a new note 
function newNote(){
    const inputNote=note.value.trim()
    if(!inputNote){
alert("Please enter text!")
return
    }
    renderNote(inputNote)
    note.textContent=""

//saving data to localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.push(inputNote)
localStorage.setItem("notes", JSON.stringify(notes));



}
saveBtn.addEventListener("click", newNote)
loadNotes()