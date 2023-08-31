
const inputBody = document.getElementById('note'),
    input = document.getElementById('title'),
    error = document.getElementsByClassName('error')[0],
    note_card = document.getElementById('notes');
let note_edit_id = -1 /* -1 Create | 0-999999 Edit */,
    _notes = getNotesFromLS();

window.onload = () => {
    displayNotes(_notes);
};


(input, inputBody).addEventListener('keyup', (event) => {
    let inputBody_value = inputBody.value;
    let input_value = input.value;
    //console.log(inputBody_value);
    if (event.code == 'Enter') {
        if (input_value == '') {
            //console.log(input_value);
            //console.log(inputBody_value);
            error.innerHTML = "Note field cannot be empty!";
            error.style.display = 'block';
        } else {
            if (note_edit_id != -1) {
                _notes.forEach(note => {
                    if (note.id == note_edit_id) {
                        note.title = input_value;
                        note.body = inputBody_value;
                    }
                });
            } else {
                _notes.push({ id: generateRandomId(), title: input_value, body: inputBody_value });
            }

            input.value = '';
            inputBody.value = '';
            displayNotes(_notes);
            error.style.display = 'none';
        }
    }
});