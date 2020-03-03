'use strict'
//getting data from localStorage
const getNotesData = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

const setNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id == id);
    if (noteIndex != -1) {
        notes.splice(noteIndex, 1)
    }
}

const createElement = (fNote) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    noteEl.setAttribute('href', `//adgsankar.github.io/notesapp/edit.html#${fNote.id}`)
    textEl.textContent = fNote.title.length > 0 ? fNote.title : 'Un Named'
    statusEl.textContent = generateLastEdited(fNote.updatedAt)

    noteEl.classList.add('list-item')
    textEl.classList.add('list-iem__title')
    statusEl.classList.add('list-item__subtitle')

    // button.addEventListener('click', () => {
    //     console.log(fNote)
    //     removeNote(fNote.id)
    //     setNotes(notes)
    //     renderNotes(notes, filters)
    // })
    noteEl.appendChild(textEl)
    noteEl.appendChild(statusEl)
    return noteEl
}


const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        console.log("edit")
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        console.log("create")

        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetical') {
        console.log("alphabeticala")
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }

}

const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const notesEl = document.querySelector('#notes')
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    // debugger
    notesEl.innerHTML = ''
    console.log(filteredNotes)
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = createElement(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const p = document.createElement('p');
        p.textContent = 'No notes to show'
        p.classList.add('empty-message')
        notesEl.appendChild(p)
    }
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`