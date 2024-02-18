const $bodyElement = document.body;
const $btnTheme0 = document.getElementById('btnTheme0');
const $btnTheme1 = document.getElementById('btnTheme1');
const $btnTheme2 = document.getElementById('btnTheme2');
const $btnTheme3 = document.getElementById('btnTheme3');

// ---------------- CHANGE THEME ----------------
function changeTheme(themeNumber) {
    // Remove all classes from the body element
    document.body.className = '';

    // Add the active-theme--[number] class to the body element
    document.body.classList.add(`active-theme--${themeNumber}`);

    // Remove shadow--active class from all buttons
    $btnTheme0.classList.remove('shadow--active');
    $btnTheme1.classList.remove('shadow--active');
    $btnTheme2.classList.remove('shadow--active');
    $btnTheme3.classList.remove('shadow--active');

    // Add shadow--active class to the button corresponding to the active theme
    switch (themeNumber) {
        case 0:
            $btnTheme0.classList.add('shadow--active');
            break;
        case 1:
            $btnTheme1.classList.add('shadow--active');
            break;
        case 2:
            $btnTheme2.classList.add('shadow--active');
            break;
        case 3:
            $btnTheme3.classList.add('shadow--active');
            break;
        default:
            break;
    }

    // Save the chosen theme to localStorage
    localStorage.setItem('chosenTheme', themeNumber);
}

// Function to apply the theme stored in localStorage (if any) on page load
function applySavedTheme() {
    const savedTheme = localStorage.getItem('chosenTheme');
    if (savedTheme !== null) {
        changeTheme(parseInt(savedTheme));
    }
}

// Call applySavedTheme function to apply the theme on page load
applySavedTheme();

// Add event listeners to each button to change themes
$btnTheme0.addEventListener('click', function() {
    changeTheme(0);
});

$btnTheme1.addEventListener('click', function() {
    changeTheme(1);
});

$btnTheme2.addEventListener('click', function() {
    changeTheme(2);
});

$btnTheme3.addEventListener('click', function() {
    changeTheme(3);
});