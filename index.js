// Randomize seats function
function randomizeSeats() {
    const studentNames = [];

    // Collect all student names
    for (let i = 1; i <= 36; i++) {
        const studentName = document.getElementById(`name${i}`).value.trim().toLowerCase();
        studentNames.push(studentName);
    }

    // Randomly shuffle the students
    let remainingStudents = [...studentNames];
    for (let i = remainingStudents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingStudents[i], remainingStudents[j]] = [remainingStudents[j], remainingStudents[i]];
    }

    // Assign shuffled students to desks
    for (let i = 1; i <= 36; i++) {
        const desk = document.getElementById(`seat${i}`);
        desk.textContent = remainingStudents[i - 1] || ''; // Handle empty students
    }

    // Save the randomized seat arrangement to local storage
    saveDeskContentsToLocalStorage();
}

// Save desk contents to local storage
function saveDeskContentsToLocalStorage() {
    let deskContents = [];
    for (let i = 1; i <= 36; i++) {
        const desk = document.getElementById(`seat${i}`);
        deskContents.push(desk.textContent.trim());
    }
    localStorage.setItem('deskContents', JSON.stringify(deskContents))
}

// Load desk contents from local storage
function loadDeskContentsFromLocalStorage() {
    const savedDeskContents = JSON.parse(localStorage.getItem('deskContents'));
    if (savedDeskContents) {
        for (let i = 1; i <= 36; i++) {
            const desk = document.getElementById(`seat${i}`);
            desk.textContent = savedDeskContents[i - 1] || ''; // Handle missing saved data
        }
    }
}

// Load saved desk contents when the page loads
window.onload = function() {
    loadDeskContentsFromLocalStorage();
}

// Sort seats alphabetically and assign them to desks
function sortSeatsAlphabetically() {
    const desks = [];
    const totalSeats = 36;

    // Collect all student names from input fields
    for (let i = 1; i <= totalSeats; i++) {
        const studentName = document.getElementById(`name${i}`).value.trim().toLowerCase();
        if (studentName) {
            desks.push(studentName);
        }
    }

    // Sort student names alphabetically
    desks.sort();

    const rows = 6;
    const cols = 6;
    let deskIndex = 0;

    // Fill the desks from front to back (row-wise)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const seatIndex = row * cols + col + 1;
            const desk = document.getElementById(`seat${seatIndex}`);

            if (deskIndex < desks.length) {
                desk.textContent = desks[deskIndex];
                deskIndex++;
            } else {
                desk.textContent = ''; // Leave empty desks if fewer students
            }
        }
    }

    // Save the sorted desk contents to local storage
    saveDeskContentsToLocalStorage();
}
