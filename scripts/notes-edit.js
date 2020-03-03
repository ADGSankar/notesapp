'use strict'
const noteId = location.hash.substring(1)
let notes = getNotesData()

const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeNoteElement = document.querySelector("#remove-note")
const lastEditElement = document.querySelector("#last-edited")
let note = notes.find((n) => n.id === noteId)

if (!note) {
    location.assign("/index.html")
}

// function editNoteBody(notes, noteId, title) {

// }

titleElement.value = note.title;
bodyElement.value = note.body;
lastEditElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener("input", (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    lastEditElement.textContent = generateLastEdited(note.updatedAt)
    setNotes(notes)
})
bodyElement.addEventListener("input", (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    lastEditElement.textContent = generateLastEdited(note.updatedAt)
    setNotes(notes)
})
removeNoteElement.addEventListener("click", (e) => {
    removeNote(note.id)
    setNotes(notes)
    location.assign("/index.html")
})

window.addEventListener('storage', (e) => {
    console.log("Changed")
    console.log(e.key, e.oldValue, e.newValue)
    if (e.key === 'notes') {
        const notes = JSON.parse(e.newValue);
        note = notes.find((n) => n.id === noteId)
        if (!note) {
            location.assign("/index.html")
        }
        titleElement.value = note.title;
        bodyElement.value = note.body;
        lastEditElement.textContent = generateLastEdited(note.updatedAt)
    }
})