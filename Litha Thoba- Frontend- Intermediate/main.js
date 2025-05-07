const notesContainer = document.querySelector(".note-grid");
const addButton = document.getElementById("add-btn");
const note = document.querySelectorAll(".card");

getNotes().forEach(note => {
  const noteElement = newNotes(note.id, note.title, note.content);
})

addButton.addEventListener("click", () => addNotes());

function getNotes() {
 return JSON.parse(localStorage.getItem("quicknote") || "[]");
}

//save the client's notes to the localstorage, name in brackets is the name of the array
function saveNotes(notes) {
  localStorage.setItem("quicknote", JSON.stringify(notes));
}

function newNotes (id, title, content) {
  //card div container
   const container = document.createElement("div");
   container.classList.add("card");
   container.classList.add("note");
  
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  
   const editBtn = document.createElement("button");
   editBtn.classList.add("btn-card");
   editBtn.id = "edit-note";
  
   const editIcon = document.createElement("i");
   editIcon.classList.add("fa-solid", "fa-pen");
  
   const deleteBtn = document.createElement("button");
   deleteBtn.classList.add("btn-card");
   deleteBtn.id = "delete-note";
  
   const deleteIcon = document.createElement("i");
   deleteIcon.classList.add("fa-solid", "fa-trash");
  
   const noteTitle = document.createElement("input");
   noteTitle.classList.add("card-title");
   noteTitle.value = title;
   noteTitle.placeholder = "Note Title...";
   noteTitle.id = "note-title"; 
  
  const noteContent = document.createElement("textarea");
  noteContent.classList.add("card-body");
  noteContent.value = content;
  noteContent.placeholder = "Your text here..."; 
  
  const noteDate = document.createElement("p");
  noteDate.classList.add("note-date");
  const currentDate = new Date().toLocaleString();
  noteDate.textContent = `${currentDate}`;
  
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("btn-card");
  saveBtn.id = "save-note";
  saveBtn.textContent = "Save";
  
  //appending the children elements to the parents
  container.appendChild(buttonContainer);
  buttonContainer.appendChild(editBtn);
  editBtn.appendChild(editIcon);
  buttonContainer.appendChild(deleteBtn);
  deleteBtn.appendChild(deleteIcon);
  container.appendChild(noteTitle);
  container.appendChild(noteContent);
  container.appendChild(noteDate);
  container.appendChild(saveBtn);
  notesContainer.appendChild(container);
  
  
  container.addEventListener("change", ()=>{
    updateContent(id, noteContent.value, noteTitle.value);
  })
  
  deleteBtn.addEventListener("click", ()=>{
   const doDelete = confirm("Are you sure you want to delete?");
   
  if (doDelete) {
    deleteNote(id, container);
  }
  })
  return container;
};



function addNotes() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
    title: "", 
    date: note.date || new Date().toLocaleString()
    };
  
  
  
const noteElement = newNotes(noteObject.id, noteObject.title, noteObject.content);
  
  notes.push(noteObject);
  saveNotes(notes);
}

function updateContent(id, newContent, newTitle) {
   const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.title = newTitle;
  targetNote.content = newContent;
  saveNotes(notes);
}

   function deleteNote(id, container) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(container);  
};