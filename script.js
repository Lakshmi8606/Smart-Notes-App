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
}
saveBtn.addEventListener("click", newNote)