const popupOverlay = document.getElementById('popupOverlay');
const loginBox = document.getElementById('loginBox');

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const authBtn = document.getElementById("authBtn");
const switchPrompt = document.getElementById("switchPrompt");

let isSignUp = false;

const users = { //Temporary user storage
    Tester: "1234"
};

function showPopup() {
    popupOverlay.classList.add('active');
    loginBox.classList.remove('hide');
    loginBox.classList.add('show');
}

function closePopup() {
    loginBox.classList.remove('show');
    loginBox.classList.add('hide');
    setTimeout(() => {
        popupOverlay.classList.remove('active');
    }, 500);
}

function switchMode() {
    isSignUp = !isSignUp;
    formTitle.textContent = isSignUp ? "Sign up to CONNECT" : "Log in to CONNECT";
    formSubtitle.textContent = isSignUp ? "Create your Online Book Library account" : "to continue to Online Book Library";
    authBtn.textContent = isSignUp ? "Sign Up" : "Login";
    switchPrompt.innerHTML = isSignUp ?
        'Already have an account? <a href="#" onclick="switchMode()">Log in</a>' :
        'Don’t have an account? <a href="#" onclick="switchMode()">Sign up now</a>';
}

function showMessage(msg) {
    const box = document.getElementById('messageBox');
    box.innerText = msg;
    box.classList.add('show');
    setTimeout(() => {
        box.classList.remove('show');
    }, 3000); // hides after 3 seconds
}

function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        showMessage("Please enter both username and password.");
        return;
    }

    if (isSignUp) {
        if (users[username]) {
            showMessage("Username already exists!");
        } else {
            users[username] = password;
            showMessage("New account created for " + username + ".");
            switchMode();
        }
    } else {
        if (users[username] && users[username] === password) {
            showMessage("Welcome back, " + username + "!");
            updateProfileUI(username);
            closePopup();
        } else {
            showMessage("Invalid username or password.");
        }
    }
}

function updateProfileUI(username) {
    // Update visible name
    document.getElementById('profileName').textContent = username;

    // Show full profile, hide sign-in
    document.getElementById('profileBeforeLogin').style.display = 'none';
    document.getElementById('profileAfterLogin').style.display = 'flex';
}

window.onload = showPopup;