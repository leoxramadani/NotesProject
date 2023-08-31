// Gjenerimi i nje numri random prej 0 deri 999999
const generateRandomId = () => Math.floor(Math.random() * 999999);

const displayNotes = (notes) => {
    let result = '';
    notes.forEach((note) => {
        result += `
        <div id="noteCard" class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.body}</p>
                <div class="card-text1">
                    <button class="btn btn-link text-success" onclick="editNote(${note.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-link text-danger" onclick="deleteNote(${note.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
        `;
    });
    note_card.innerHTML = result; // output
    saveNotesToLS(notes);
};
const apiUrl = 'http://localhost:7094/graphql/';
const graphqlQuery = `query{
    places{
      myID,
      myName
    }
  }`;

  const urlWithQuery = apiUrl + '?query=' + encodeURIComponent(graphqlQuery);

  fetch(urlWithQuery)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



// Search
const searchUser = document.querySelector("#search");

searchUser.addEventListener("input", e => {
    const element = e.target.value.toLowerCase()
    const search = _notes.filter(note =>
        note.title.toLowerCase().includes(element)
    )
    displayNotes(search);
})

// Edit
const editNote = (id) => {
    const note = _notes.filter(note => note.id == id);
    input.value = note[0].title;
    inputBody.value = note[0].body;
    note_edit_id = id;
};

// Delete
const deleteNote = (id) => {
    _notes = _notes.filter((note) => note.id != id);
    displayNotes(_notes);
};

// Save notes to local storage
const saveNotesToLS = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Get notes from local storage
const getNotesFromLS = () => {
    const notes_from_localstorage = localStorage.getItem('notes');
    return (notes_from_localstorage == null || notes_from_localstorage == undefined) ? [] : JSON.parse(notes_from_localstorage);
};