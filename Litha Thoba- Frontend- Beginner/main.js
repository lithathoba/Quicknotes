// JavaScript source code
//shows the login modal
document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("login");
    loginModal.style.display = "block";
});
document.addEventListener("DOMContentLoaded", () => {
    const userButton = document.querySelector(".user");
    const loginModal = document.getElementById("login");
    userButton.addEventListener("click", () => {
        loginModal.style.display = "block"; // shows the modal
    });

    //lets user close modal by clicking outside the modal
    document.addEventListener("click", (event) => {
        if (!loginModal.contains(event.target) && event.target !== userButton) {
            loginModal.style.display = "none"; // hides modal
        }
    });
});

//add name to h1
document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("login");
    const usernameInput = document.getElementById("username");
    const loginButton = document.querySelector(".social-btn"); // Assuming this is the login button
    const headerGreeting = document.querySelector("header h1");

    // Display login modal on page load
    loginModal.style.display = "block";

    // Event listener for login button
    loginButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        const username = usernameInput.value.trim();
        const displayName = username || "User"; // Default to "User" if the input is empty

        // Save the username in localStorage
        localStorage.setItem("username", displayName);

        // Update the header greeting
        headerGreeting.textContent = `Hello, ${displayName}`;

        // Hide the login modal
        loginModal.style.display = "none";
    });

    // Retrieve the username from localStorage on page load
    const savedUsername = localStorage.getItem("username") || "User";
    headerGreeting.textContent = `Hello, ${savedUsername}`;
});

//filter notes by notebook/tag
const notes = []; // Array to store all notes

document.getElementById("work").addEventListener("click", () => {
    displayNotes("Work");
});

document.getElementById("personal").addEventListener("click", () => {
    displayNotes("Personal");
});

function displayNotes(notebook) {
    const filteredNotes = notes.filter((note) => note.notebook === notebook);
    const notesSection = document.querySelector(".notes");
    notesSection.innerHTML = ""; // Clear current notes
    filteredNotes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
        notesSection.appendChild(noteElement);
    });
}

//add a custom notebook
document.querySelector(".add-notebook").addEventListener("click", () => {
    const notebookName = prompt("Enter a new notebook name:");
    if (notebookName) {
        const notebooksSection = document.getElementById("notebooks-section ul");
        const newNotebook = document.createElement("li");
        newNotebook.innerHTML = `<button class="notebook">${notebookName}</button>`;
        notebooksSection.appendChild(newNotebook);
    }
});

//logic for notebooks
const notes = [
    { id: 1, title: "", content: "", notebook: "Work", tags: [""] },
    { id: 2, title: "", content: "", notebook: "Personal", tags: [""] }
];

//persist notes on refresh
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) notes.push(...savedNotes);
}

document.addEventListener("DOMContentLoaded", loadNotes);

//add notes
document.getElementById("add-btn").addEventListener("click", async () => {
    const title = document.getElementById("note-title").value;
    const body = document.getElementById("note-content").value;

    const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
    });

    if (response.ok) {
        alert("Note added successfully!");
    } else {
        alert("Failed to add note.");
    }
});

document.getElementById("delete-note").addEventListener("click", async () => {
    const noteId = prompt("Enter the ID of the note to delete:");

    const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("Note deleted successfully!");
    } else {
        alert("Failed to delete note.");
    }
});

note.forEach((note) => {
    const tagText = note.tag ? `Tag: ${note.tag}` : ""; // Only display tag if it exists
    console.log(`Title: ${note.title}, Body: ${note.body}, ${tagText}`);
});
