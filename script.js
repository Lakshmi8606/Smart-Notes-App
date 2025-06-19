const note=document .getElementById("note")
const saveBtn=document.getElementById("save-btn")
const allNotes=document.getElementById("all-notes")

function renderNote(noteObj){
    const noteElt=document.createElement("div")
    noteElt.classList.add("note")
    const date = new Date(noteObj.time).toLocaleString(); // for readable time
    noteElt.innerHTML = `<strong>${date}</strong><br>${noteObj.text}`
    allNotes.appendChild(noteElt)
}
function loadNotes(){
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.sort((a, b)=>b.time - a.time)
notes.forEach(renderNote)
}
//Function to add a new note 
function newNote(){
    const inputNote=note.value.trim()
    if(!inputNote){
alert("Please enter text!")
return
    }
    const newNoteObj={
    text: inputNote,
    time: Date.now()
}
    renderNote(newNoteObj)
    note.value=""

//saving data to localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];


notes.push(newNoteObj)
localStorage.setItem("notes", JSON.stringify(notes));



}
saveBtn.addEventListener("click", newNote)
loadNotes()