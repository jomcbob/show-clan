let count = 1;

function randomizeSeats() {
    const studentNames = [];

    for (let i = 1; i <= 36; i++) {
        const studentName = document.getElementById(`name${i}`).value.trim();
        const formattedName = studentName.charAt(0).toUpperCase() + studentName.slice(1).toLowerCase();
        studentNames.push(formattedName);
    }

    let indexfriend1 = studentNames.indexOf(friend1)
    let indexAndrew = studentNames.indexOf(andrew)
    let indexfriend2 = studentNames.indexOf(friend2)
    let indexfriend3 = studentNames.indexOf(friend3)
    let indexfriend4 = studentNames.indexOf(friend4)
    let indexfriend5 = studentNames.indexOf(friend5)
    let indexfriend6 = studentNames.indexOf(friend6)
    let indexfriend7 = studentNames.indexOf(friend7)
    let indexfriend8 = studentNames.indexOf(friend8)
    let indexfriend9 = studentNames.indexOf(friend9)
    let indexfriend10 = studentNames.indexOf(friend10)
    let indexfriend11 = studentNames.indexOf(friend11)

    let pair = []

    if (pair.length === 0 && indexAndrew > -1) {
        if (count === 1 || count === 6 && indexfriend3 > -1 && indexAndrew > -1) {
            pair = [andrew, friend3]
        } else if (count === 2 || count === 4 && indexfriend4 > -1 && indexAndrew > -1) {
            pair = [andrew, friend4]
        } else if (count === 3  && indexfriend9 > -1 && indexAndrew > -1) {
            pair = [andrew, friend9]
        } else if (count === 5 || Math.random() < 0.5 && indexfriend1 > -1 && indexAndrew > -1) {
            pair = [andrew, friend1]
        } else if (Math.random() < 0.005 && indexfriend8 > -1 && indexAndrew > -1) {
            pair = [andrew, friend8]
        } else if (Math.random() < 0.1 && indexfriend2 > -1 && indexAndrew > -1) {
            pair = [andrew, friend2]
        } else if (Math.random() < 0.1 && indexfriend5 > -1 && indexAndrew > -1) {
            pair = [andrew, friend5]
        } else if (Math.random() < 0.3 && indexfriend6 > -1 && indexAndrew > -1) {
            pair = [andrew, friend6]
        } else if (Math.random() < 0.1 && indexfriend7 > -1 && indexAndrew > -1) {
            pair = [andrew, friend7]
        } else if (Math.random() < 0.9 && indexfriend10 > -1 && indexAndrew > -1) {
            pair = [andrew, friend10]
        } else if (Math.random() < 1.1 && indexfriend11 > -1 && indexAndrew > -1) {
            pair = [andrew, friend11]
        }
    }
    if (pair.length === 0 && indexAndrew > -1) {
        if (indexfriend4 > -1) {
            pair = [andrew, friend4]
        } else if (indexfriend3 > -1) {
            pair = [andrew, friend3]
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
    if (count <= 6) {
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

const andrew = "Andrew borlin";
const friend1 = "Keo matsura";
const friend2 = "Tag craven";
const friend3 = "Alayna foster";
const friend4 = "Jenna kauer";
const friend5 = "Jacob myer";
const friend6 = "Vaughn lind";
const friend7 = "Nia borlin";
const friend8 = "Hudson tyger";
const friend9 = "Brielle foster";
const friend10 = "Karli richardson";
const friend11 = "Chloe richardson";
