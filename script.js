let count = 1;

function randomizeSeats() {
    const studentNames = [];

    for (let i = 1; i <= 36; i++) {
        const studentName = document.getElementById(`name${i}`).value.trim();
        const formattedName = studentName.charAt(0).toUpperCase() + studentName.slice(1).toLowerCase();
        studentNames.push(formattedName);
    }

    let indexJomcbob = studentNames.indexOf(jomcbob)

    let indexfriend1 = studentNames.indexOf(friend1)
    let indexfriend2 = studentNames.indexOf(friend2)
    let indexfriend3 = studentNames.indexOf(friend3)
    let indexfriend4 = studentNames.indexOf(friend4)

    let pair = []

    if (pair.length === 0 && indexJomcbob > -1) {
        if         (count === 1 && indexfriend1 > -1 && indexJomcbob > -1) {
            pair = [jomcbob, friend1]
        } else if (count === 2 && indexfriend2 > -1 && indexJomcbob > -1) {
            pair = [jomcbob, friend2]
        } else if (count === 3  && indexfriend3 > -1 && indexJomcbob > -1) {
            pair = [jomcbob, friend3]
        } else if (count === 4 && indexfriend4 > -1 && indexJomcbob > -1) {
            pair = [jomcbob, friend4]
        }
    }
    if (pair.length === 0 && indexJomcbob > -1) {
        if (indexfriend1 > -1) {
            pair = [jomcbob, friend1]
        }
    }

    const remainingStudents = [...studentNames];
    if (pair.length > 0) {
        remainingStudents.splice(remainingStudents.indexOf(pair[0]), 1);
        remainingStudents.splice(remainingStudents.indexOf(pair[1]), 1);
    }

    for (let i = remainingStudents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingStudents[i], remainingStudents[j]] = [remainingStudents[j], remainingStudents[i]];
    }

    const validHorizontalPairs = [
        [1, 2], [3, 4], [5, 6],
        [7, 8], [9, 10], [11, 12],
        [13, 14], [15, 16], [17, 18],
        [19, 20], [21, 22], [23, 24],
        [25, 26], [27, 28], [29, 30],
        [31, 32], [33, 34], [35, 36]
    ]

    if (pair.length > 0) {
        const selectedPair = validHorizontalPairs[Math.floor(Math.random() * validHorizontalPairs.length)];
        let insertPosition1 = selectedPair[0] - 1;
        let insertPosition2 = selectedPair[1] - 1;

        remainingStudents.splice(insertPosition1, 0, pair[0]);
        remainingStudents.splice(insertPosition2, 0, pair[1]);
    }

    for (let i = 1; i <= 36; i++) {
        const desk = document.getElementById(`seat${i}`);
        desk.textContent = remainingStudents[i - 1];
    }

    saveDeskContentsToLocalStorage()
    if (count < 4) {
        count++
    } else count = 1
}

function sortSeatsAlphabetically() {
    const desks = [];
    const totalSeats = 36

    for (let i = 1; i <= totalSeats; i++) {
        const studentName = document.getElementById(`name${i}`).value.trim()
        if (studentName) {
            desks.push(studentName);
        }
    }

    desks.sort()
    const rows = 6
    const cols = 6
    let deskIndex = 0

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const seatIndex = row * cols + col + 1
            const desk = document.getElementById(`seat${seatIndex}`)

            if (deskIndex < desks.length) {
                desk.textContent = desks[deskIndex]
                deskIndex++;
            } else {
                desk.textContent = ''
            }
            saveDeskContentsToLocalStorage()
        }
    }
    if (Math.random() < 0.5) {
        return count = 1
    } else if (Math.random() < 0.5) {
        return count = 2
    } else count = 7
}

function saveDeskContentsToLocalStorage() {
    let deskContents = [];
    for (let i = 1; i <= 36; i++) {
        const desk = document.getElementById(`seat${i}`)
        deskContents.push(desk.textContent.trim())
    }
    localStorage.setItem('deskContents', JSON.stringify(deskContents))
}

function loadDeskContentsFromLocalStorage() {
    const savedDeskContents = JSON.parse(localStorage.getItem('deskContents'))
    if (savedDeskContents) {
        for (let i = 1; i <= 36; i++) {
            const desk = document.getElementById(`seat${i}`)
            desk.textContent = savedDeskContents[i - 1] || ''
        }
    }
}

window.onload = function() {
    loadDeskContentsFromLocalStorage()
}

const jomcbob = "Jomcbob";
const friend1 = "Bob1";
const friend2 = "Bob2";
const friend3 = "Bob3";
const friend4 = "Bob4";

