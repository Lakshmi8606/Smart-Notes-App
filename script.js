const note = document.getElementById("note");
const saveBtn = document.getElementById("save-btn");
const allNotes = document.getElementById("all-notes");

function renderNote(noteObj) {
    const noteElt = document.createElement("div");
    noteElt.classList.add("note");
    noteElt.setAttribute("data-time", noteObj.time);

    const date = new Date(noteObj.time).toLocaleString();
    const content = document.createElement("div");
    content.innerHTML = `<strong>${date}</strong><br>${noteObj.text}`;
    content.style.flexGrow = "1";

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        noteElt.remove();
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes = notes.filter(n => n.time !== noteObj.time);
        localStorage.setItem("notes", JSON.stringify(notes));
    });

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", () => {
        const textarea = document.createElement("textarea");
        textarea.value = noteObj.text;
        const saveEditBtn = document.createElement("button");
        saveEditBtn.textContent = "Save";

        noteElt.replaceChild(textarea, content);
        noteElt.replaceChild(saveEditBtn, editBtn);

        saveEditBtn.addEventListener("click", () => {
            const updatedText = textarea.value.trim();
            if (!updatedText) {
                alert("Text cannot be empty.");
                return;
            }

            noteObj.text = updatedText;
            content.innerHTML = `<strong>${date}</strong><br>${updatedText}`;
            noteElt.replaceChild(content, textarea);
            noteElt.replaceChild(editBtn, saveEditBtn);

            let notes = JSON.parse(localStorage.getItem("notes")) || [];
            const index = notes.findIndex(n => n.time === noteObj.time);
            if (index !== -1) {
                notes[index].text = updatedText;
                localStorage.setItem("notes", JSON.stringify(notes));
            }
        });
    });

    noteElt.style.display = "flex";
    noteElt.style.justifyContent = "space-between";
    noteElt.style.alignItems = "center";
    noteElt.style.gap = "1rem";

    noteElt.appendChild(content);
    noteElt.appendChild(editBtn);
    noteElt.appendChild(deleteBtn);
    allNotes.prepend(noteElt);
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.sort((a, b) => b.time - a.time);
    notes.forEach(renderNote);
}

function newNote() {
    const inputNote = note.value.trim();
    if (!inputNote) {
        alert("Please enter text!");
        return;
    }

    const newNoteObj = {
        text: inputNote,
        time: Date.now()
    };

    renderNote(newNoteObj);
    note.value = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(newNoteObj);
    localStorage.setItem("notes", JSON.stringify(notes));
}

saveBtn.addEventListener("click", newNote);
loadNotes();
