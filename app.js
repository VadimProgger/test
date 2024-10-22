const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $currentAddOne = document.querySelector('#current-add-one');
const $boostButton = document.querySelector('#boost-button');
const $dropdown = document.getElementById("myDropdown");

let addOneValue = Number(localStorage.getItem('addOneValue')) || 1; // Default value for addOne
let boostPrice = Number(localStorage.getItem('boostPrice')) || 100; // Initial price for the boost
let score = Number(localStorage.getItem('score')) || 0; // Initial score

function Start() {
    setScore(score);
    updateAddOneDisplay();
    updateBoostButton(); // Initialize boost button display
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function addOne() {
    score += addOneValue; // Update score
    setScore(score); // Save updated score
}

function toggleDropdown() {
    $dropdown.classList.toggle("show");
}

function getUserIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id');
}

// Call this function when the page loads
const userId = getUserIdFromURL();
if (userId) {
    fetchUserData(userId);
}

$boostButton.addEventListener('click', () => {
    if (score >= boostPrice) {
        score -= boostPrice; // Deduct the current boost price
        addOneValue += 1; // Increase addOne value by 1
        boostPrice *= 2; // Double the boost price
        
        // Save updated values to localStorage
        localStorage.setItem('addOneValue', addOneValue);
        localStorage.setItem('boostPrice', boostPrice);
        
        updateAddOneDisplay(); // Update the display for addOne
        updateBoostButton(); // Update the boost button text
        toggleDropdown(); // Close dropdown after action
        setScore(score); // Save updated score
    } else {
        alert("Not enough coins!");
    }
});

function updateAddOneDisplay() {
    $currentAddOne.textContent = `+${addOneValue}`;
}

function updateBoostButton() {
    $boostButton.innerHTML = `Multitap<br><img src="./assets/image/coin2.png" alt=""> ${boostPrice}`; // Update button text
}

$circle.addEventListener('click', (event) => {
    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${addOneValue}`;
    $circle.parentElement.appendChild(plusOne);
    addOne();
    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Prevent closing the dropdown when clicking on the background
window.onclick = function(event) {
    if (event.target.matches('.close-button')) {
        toggleDropdown();
    }
}

if (window.innerWidth > 768) {
    document.body.innerHTML = '<h1>Только для мобильных устройств</h1><p>Пожалуйста, используйте мобильное устройство для доступа к этой странице.</p>';
}

Start();
