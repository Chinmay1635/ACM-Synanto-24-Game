// Get the level from the URL
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');
document.getElementById('level-number').innerText = level;


window.onload = function () {
    totalScore = parseInt(localStorage.getItem('totalScore'), 10) || 0;  // Fetch stored total score
    updateScore();  // Display it in the UI
    startLevel(level);  // Start the level timer
    loadRandomImage();
};

// Define image sets for each level
const levelImages = {
    1: ['/images/level1/level1-img1.jpg', '/images/level1/level1-img2.jpg', '/images/level1/level1-img3.jpg', '/images/level1/level1-img4.jpg', '/images/level1/level1-img5.jpg'],
    2: ['/images/level2/level2-img1.jpg', '/images/level2/level2-img2.jpg', '/images/level2/level2-img3.jpg', '/images/level2/level2-img4.jpg', '/images/level2/level2-img5.jpg'],
    3: ['/images/level3/level3-img1.jpg', '/images/level3/level3-img2.jpg', '/images/level3/level3-img3.jpg', '/images/level3/level3-img4.jpg', '/images/level3/level3-img5.jpg'],
    4: ['/images/level4/level4-img1.jpg', '/images/level4/level4-img2.jpg', '/images/level4/level4-img3.jpg', '/images/level4/level4-img4.jpg', '/images/level4/level4-img5.jpg'],
    5: ['/images/level5/level5-img1.jpg', '/images/level5/level5-img2.jpg', '/images/level5/level5-img3.jpg', '/images/level5/level5-img4.jpg', '/images/level5/level5-img5.jpg']
};

// Select a random image and apply it to the puzzle pieces
function loadRandomImage() {
    // Select a random image for the current level
    const images = levelImages[level] || [];
    // const selectedImage = 'wallpaper.jpg';
    const selectedImage = images[Math.floor(Math.random() * images.length)];
    // Set each puzzle piece's background to the appropriate part of the selected image
    document.getElementById('piece-1').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-2').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-3').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-4').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-5').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-6').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-7').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-8').style.backgroundImage = `url(${selectedImage})`;
    document.getElementById('piece-9').style.backgroundImage = `url(${selectedImage})`;

    setPiecePositions();
}

// Set the background positions for each puzzle piece (since it's the same for all images)
function setPiecePositions() {
    document.getElementById('piece-1').style.backgroundPosition = '0 0';
    document.getElementById('piece-2').style.backgroundPosition = '-100px 0';
    document.getElementById('piece-3').style.backgroundPosition = '-200px 0';
    document.getElementById('piece-4').style.backgroundPosition = '0 -100px';
    document.getElementById('piece-5').style.backgroundPosition = '-100px -100px';
    document.getElementById('piece-6').style.backgroundPosition = '-200px -100px';
    document.getElementById('piece-7').style.backgroundPosition = '0 -200px';
    document.getElementById('piece-8').style.backgroundPosition = '-100px -200px';
    document.getElementById('piece-9').style.backgroundPosition = '-200px -200px';
}







// Store the correct order of the pieces
const correctOrder = ['piece-1', 'piece-2', 'piece-3', 'piece-4', 'piece-5', 'piece-6', 'piece-7', 'piece-8', 'piece-9'];

let draggedPiece = null;
let draggedTouchElement = null; // For touch event handling

// Shuffle the pieces when the shuffle button is clicked
function shufflePieces() {
    const puzzleContainer = document.querySelector('.puzzle-container');
    for (let i = puzzleContainer.children.length; i >= 0; i--) {
        puzzleContainer.appendChild(puzzleContainer.children[Math.random() * i | 0]);
    }

    // Hide the Shuffle button and show the Submit button
    // document.getElementById('shuffle-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'inline-block';
}

// Attach both drag and touch events
const pieces = document.querySelectorAll('.puzzle-piece');
pieces.forEach(piece => {
    // Desktop drag events
    piece.addEventListener('dragstart', function () {
        draggedPiece = this;
    });

    piece.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    piece.addEventListener('drop', function () {
        if (draggedPiece && this !== draggedPiece) {
            swapPieces(draggedPiece, this);
        }
    });

    // Mobile touch events
    piece.addEventListener('touchstart', function (e) {
        draggedTouchElement = e.target;
    });

    piece.addEventListener('touchmove', function (e) {
        e.preventDefault(); // Prevent scrolling while dragging
    });

    piece.addEventListener('touchend', function (e) {
        const targetElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (draggedTouchElement && targetElement.classList.contains('puzzle-piece') && draggedTouchElement !== targetElement) {
            swapPieces(draggedTouchElement, targetElement);
        }
    });
});

// Function to swap the dragged and dropped pieces
function swapPieces(draggedElement, droppedElement) {
    let droppedPieceClone = droppedElement.cloneNode(true);
    let draggedPieceClone = draggedElement.cloneNode(true);

    // Replace dropped piece with dragged piece
    droppedElement.parentNode.replaceChild(draggedPieceClone, droppedElement);
    draggedElement.parentNode.replaceChild(droppedPieceClone, draggedElement);

    // Reattach drag and touch events for the new elements
    reattachDragAndTouchEvents();
}

// Reattach drag and touch events to the newly swapped pieces
function reattachDragAndTouchEvents() {
    const newPieces = document.querySelectorAll('.puzzle-piece');
    newPieces.forEach(piece => {
        // Desktop drag events
        piece.addEventListener('dragstart', function () {
            draggedPiece = this;
        });

        piece.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        piece.addEventListener('drop', function () {
            if (draggedPiece && this !== draggedPiece) {
                swapPieces(draggedPiece, this);
            }
        });

        // Mobile touch events
        piece.addEventListener('touchstart', function (e) {
            draggedTouchElement = e.target;
        });

        piece.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });

        piece.addEventListener('touchend', function (e) {
            const targetElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            if (draggedTouchElement && targetElement.classList.contains('puzzle-piece') && draggedTouchElement !== targetElement) {
                swapPieces(draggedTouchElement, targetElement);
            }
        });
    });
}

// Check if the puzzle is correctly arranged
function checkPuzzle() {
    const puzzleContainer = document.querySelector('.puzzle-container');
    const currentOrder = Array.from(puzzleContainer.children).map(piece => piece.id);

    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        const completed = true;  // Assume level is completed when submitting
        endLevel(completed);  // End the level and calculate the score


        document.getElementById('result').innerText = 'Congratulations! You solved the puzzle!';
        document.getElementById('result').style.color = 'green';


        // Retrieve the current progress value from localStorage
        let progress = localStorage.getItem('progress');

        // Parse the value to an integer, defaulting to 1 if it doesn't exist
        progress = parseInt(progress) || 1;

        // Increment the progress value by 1
        if (level == progress && level != 5) {
            progress += 1;
        }
        if (level == 5) {
            localStorage.setItem('progress', 1);
            document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            window.location.href = '/winner.html';
        } else {
            localStorage.setItem('progress', progress);
            window.location.href = '/ACM-SLIDER/levels.html';
        }

    } else {
        document.getElementById('result').innerText = 'Oops! The puzzle is not correct. Try again!';
        document.getElementById('result').style.color = 'red';
    }
}



// Load a random image when the page loads


let totalScore = parseInt(localStorage.getItem('totalScore'), 10) || 0;  // Fetch stored total score or set to 0

let timer;
let timeLeft = 70;  // 1 minute for the game
let score = 0;      // Initial score
let levelStartTime; // Time when the level started

function startTimer() {
    timeLeft = 60;
    var shuffleTimer = 5;
    // document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        // document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft == 55) {
            shufflePieces();
        }
        if (timeLeft >= 55) {
            document.getElementById('timer').innerText = `Time Left: ${shuffleTimer}s`;
            shuffleTimer--;
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            // endLevel(false);  // Time ran out, player didn't finish
        }
    }, 1000); // Timer updates every second
}

function startLevel(level) {
    levelStartTime = new Date();  // Record when the level started
    startTimer();  // Start the timer when the level starts
}

function endLevel(completed) {
    clearInterval(timer); // Stop the timer when the level ends

    if (completed) {
        const timeTaken = (new Date() - levelStartTime) / 1000; // Time taken in seconds
        let score = calculateScore(timeTaken);

        // Get username from localStorage or prompt user if not available
        let username = localStorage.getItem('username');
        if (!username) {
            username = prompt("Please enter your username:");
            localStorage.setItem('username', username);
        }

        // Send score to backend
        sendScoreToBackend(username, score, level);


    }
}

function calculateScore(timeTaken) {
    let currentLevelScore = 0;

    if (timeTaken <= 15) {
        currentLevelScore = 10;
    } else if (timeTaken <= 20) {
        currentLevelScore = 9;
    } else if (timeTaken <= 25) {
        currentLevelScore = 8;
    } else if (timeTaken <= 30) {
        currentLevelScore = 7;
    } else if (timeTaken <= 40) {
        currentLevelScore = 6;
    } else {
        currentLevelScore = 5;
    }

    totalScore += currentLevelScore;  // Add current level score to total score
    localStorage.setItem('totalScore', totalScore);  // Save the updated total score in localStorage
    return currentLevelScore;
    // alert(`You finished in ${timeTaken.toFixed(2)} seconds. Your score for this level is: ${currentLevelScore}. Total score: ${totalScore}`);
    // updateScore();  // Update the score UI
}

function sendScoreToBackend(username, score, level) {
    fetch('https://acm-synanto-2024-game.vercel.app/api/score/submit-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            score: score,
            level: level,
        }),
    })
        .then(response => response.json())
        .then(data => {

            console.log('Score submitted:', data);
        })
        .catch((error) => {
            console.error('Error submitting score:', error);
        });
}


const updateScore = () => { }

