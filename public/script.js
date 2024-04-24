// Function to open a specific tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Function to fetch and display the text to be typed
function displayTextToType() {
    fetch('textToType.txt')
        .then(response => response.text())
        .then(data => {
            const textToTypeContainer = document.getElementById('textToTypeContainer');
            textToTypeContainer.textContent = data;
        })
        .catch(error => console.error('Error fetching text:', error));
}

// Call the function to display the text when the page loads
displayTextToType();

// Function to calculate speed and accuracy for typing test
function calculateTestSpeedAndAccuracy() {
    const time=30;
    const typedText = userInput.value.trim();
    const textToType = document.getElementById('textToTypeContainer').textContent.trim();
    const typedWordCount = typedText.split(/\s+/).length;
    const expectedWordCount = textToType.split(/\s+/).length;
    const accuracy = calculateAccuracy(typedText, textToType);
    const elapsedTime =   time - Math.floor((Date.now() - testStartTime) / 1000);
    const testSpeedValue = Math.round((typedWordCount / time) * 60); // Adjusted to words per minute
    const testAccuracyValue = Math.round(accuracy * 100); // Convert accuracy to percentage

    // Update the results in the result tab 
    const testSpeedDisplay = document.getElementById('testSpeed');
    const testAccuracyDisplay = document.getElementById('testAccuracy');

    document.getElementById('result_analysis').style.display = 'block';
    testSpeedDisplay.textContent = `${testSpeedValue}`;
    document.getElementById('t_spd').style.display = 'block';
    
    testAccuracyDisplay.textContent = `${testAccuracyValue}`;
    document.getElementById('t_acu').style.display = 'block';
    show_result();
    // Show the result tab
}

// Function to calculate speed and accuracy for typing race
function calculateRaceSpeedAndAccuracy() {
    const typedText = raceInput.value.trim();
    const textToType = document.getElementById('raceText').textContent.trim();
    const typedWordCount = typedText.split(/\s+/).length;
    const expectedWordCount = textToType.split(/\s+/).length;
    const accuracy = calculateAccuracy(typedText, textToType);
    const elapsedTime = 60 - Math.floor((Date.now() - raceStartTime) / 1000);
    const raceSpeedValue = Math.round((typedWordCount / 60) * 60); // Adjusted to words per minute
    const raceAccuracyValue = Math.round(accuracy * 100); // Convert accuracy to percentage

    // Update the results in the result tab
    const raceSpeedDisplay = document.getElementById('raceSpeed');
    const raceAccuracyDisplay = document.getElementById('raceAccuracy');

    raceSpeedDisplay.textContent = `${raceSpeedValue}`;
    document.getElementById('r_spd').style.display = 'block';
    raceAccuracyDisplay.textContent = `${raceAccuracyValue}`;
    document.getElementById('r_acu').style.display = 'block';
    show_result();
}
function show_result() {    
    document.getElementById('result_analysis').style.display = 'block';
    document.getElementById('textToTypeContainer').style.display = 'none';
    document.getElementById('testTimer').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';  
    document.getElementById('userInput').style.display = 'none';
}
// Function to restart the typing
function show_typing() {
    document.getElementById('result_analysis').style.display = 'none';
    document.getElementById('textToTypeContainer').style.display = 'block';
    document.getElementById('testTimer').style.display = 'block';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('userInput').style.display = 'block';
}
// Function to start the timer for typing race
function startRaceTimer() {

    raceStartTime = Date.now();
    raceTimerInterval = setInterval(updateRaceTimer, 1000);
}


// Function to update the timer display for typing race
function updateRaceTimer() {
    const elapsedTime = Math.floor((Date.now() - raceStartTime) / 1000);
    const remainingTime = 60 - elapsedTime; // 60-second duration for typing race
    const raceTimerDisplay = document.getElementById('raceTimer');
    if (remainingTime >= 0) {
        raceTimerDisplay.textContent = `${remainingTime} s`;
    } else {
        clearInterval(raceTimerInterval);
        raceTimerDisplay.textContent = 'Time\'s up!';
        raceInput.disabled = true; // Disable the input field
        calculateRaceSpeedAndAccuracy();
    }
}

// Function to calculate accuracy of typed text
function calculateAccuracy(typedText, expectedText) {
    let correctCount = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === expectedText[i]) {
            correctCount++;
        }
    }
    return correctCount / expectedText.length;
}

// Typing Race Section
const raceInput = document.getElementById('raceInput');
const raceStartButton = document.getElementById('raceStartButton');

raceStartButton.addEventListener('click', () => {
    startRaceTimer();
});

// Disable backspace key during typing
window.addEventListener('keydown', function (e) {
    if ((e.key === 'Backspace' || e.keyCode === 8) && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT')) {
        e.preventDefault();
    }
});
