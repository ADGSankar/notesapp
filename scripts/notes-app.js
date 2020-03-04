'use strict'
// const notes = [{
//     title: 'My next trip',
//     body: 'I would like to go to Spain'
// }, {
//     title: 'Habbits to work on',
//     body: 'Exercise. Eating a bit better'
// }, {
//     title: 'Office modification',
//     body: 'Get a new seat'
// }]

let notes = getNotesData()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}


// local storage examples
// const user = { 
// localStorage.setItem('user', JSON.stringify(user))


// console.log(JSON.parse(localStorage.getItem('user')))
// localStorage.removeItem('user')


/////////////////////////




renderNotes(notes, filters)

// document.querySelector('#click-me').addEventListener('click', function (e) {
//     console.log('Button clicked')
//     e.target.textContent = "sankar"
// })

// document.querySelector('#remove-all').addEventListener('click', function (e) {
//     console.log('delete')
//     document.querySelectorAll('.note').forEach(function (note) {
//         note.remove()
//     })
// })

document.querySelector('#new-note').addEventListener('input', (e) => {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})


document.querySelector('#create-notes').addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(e.target.elements.newNote.value)
    // let noteText = !e.target.elements.newNote.value.length ? "Un Named" : e.target.elements.newNote.value
    let noteText = ''
    let nId = uuidv4();
    let timestamp = moment().valueOf()
    notes.push({
        id: nId,
        title: noteText,
        body: noteText,
        createdAt: timestamp,
        updatedAt: timestamp
    })
    setNotes(notes)
    renderNotes(notes, filters)
    // e.target.elements.newNote.value = ''
    // console.log('asdfasd')
    location.assign(`./edit.html#${nId}`)
})

// document.querySelector('#for-fun').addEventListener('change', (e) => {
//     console.log(e.target.value)
// })

document.querySelector('#sort-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    console.log(e.target.value)
    renderNotes(notes, filters)

})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

// const date1 = new Date('July 03 1998')
// const date2 = new Date('September 16 1996')
// console.log(date1, date1.getTime())
// console.log(date2, date2.getTime())

// if (date1.getTime() < date2.getTime()) {
//     console.log(date1.toString())
// } else {
//     console.log(date2.toString())
// }

// const now = moment();
// // now.set('year', 1998);
// // now.set('month', 6);
// // now.set('date', 3);
// now.year(1998).month(6).date(3);
// console.log(now.toString());
// console.log(now.format('MMM DD, YYYY   HH:mm:ss A'));


// console.log('This is Note-app.js')

// // const p =
// const p = document.querySelector('p')
// console.log(p)
// p.textContent = "Hello Sankar"
// const ps = document.querySelectorAll('p')
// ps.forEach(function (p) {
//     console.log(p.textContent)
//     p.remove()
// })

// const newP = document.createElement('p')
// newP.textContent = "This is new P tag created from JS"
// document.querySelector('body').appendChild(newP)
// // console.log(p)