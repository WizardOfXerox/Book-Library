const popupOverlay = document.getElementById('popupOverlay');
const loginBox = document.getElementById('loginBox');

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const authBtn = document.getElementById("authBtn");
const switchPrompt = document.getElementById("switchPrompt");

let isSignUp = false;
let currentUser = null; // track who's logged in

const users = { //Temporary user storage
    Tester: "1234"
};

function showPopup() {
    if (currentUser) {
        showSettings();
        return; // User already logged in
    } else {
        // No users exist, show sign up by default
        //isSignUp = true;
        //formTitle.textContent = "Sign up to CONNECT";
        //formSubtitle.textContent = "Create your Online Book Library account";
        //authBtn.textContent = "Sign Up";
        //switchPrompt.innerHTML = 'Already have an account? <a href="#" onclick="switchMode()">Log in</a>';
        popupOverlay.classList.add('active');
        loginBox.classList.remove('hide');
        loginBox.classList.add('show');
    }
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

    currentUser = username;

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
    currentUser = username;
    document.getElementById('profileName').textContent = username;

    // Show full profile, hide sign-in
    document.getElementById('profileBeforeLogin').style.display = 'none';
    document.getElementById('profileAfterLogin').style.display = 'flex';
}

window.onload = showPopup;

// Settings

function showSettings() {
    if (!currentUser) return;

    // Fill form with current data
    document.getElementById('editUsername').value = currentUser;
    document.getElementById('editPassword').value = users[currentUser] || '';

    // Show settings popup
    document.getElementById('settingsOverlay').classList.add('active');
    document.getElementById('settingsBox').classList.remove('hide');
    document.getElementById('settingsBox').classList.add('show');
}

function closeSettings() {
    document.getElementById('settingsBox').classList.remove('show');
    document.getElementById('settingsBox').classList.add('hide');
    setTimeout(() => {
        document.getElementById('settingsOverlay').classList.remove('active');
    }, 500);
}

function saveSettings(e) {
    e.preventDefault();
    const newUsername = document.getElementById('editUsername').value.trim();
    const newPassword = document.getElementById('editPassword').value.trim();

    if (!newUsername || !newPassword) {
        showMessage("Please fill in all fields.");
        return;
    }

    // Rename user key if username changed
    if (newUsername !== currentUser) {
        if (users[newUsername]) {
            showMessage("Username already taken.");
            return;
        }
        users[newUsername] = newPassword;
        delete users[currentUser];
        currentUser = newUsername;
    } else {
        users[currentUser] = newPassword;
    }

    updateProfileUI(currentUser);
    showMessage("Account updated.");
    closeSettings();
}

function logout() {
    currentUser = null;
    document.getElementById('profileBeforeLogin').style.display = 'flex';
    document.getElementById('profileAfterLogin').style.display = 'none';
    closeSettings();
    showMessage("Logged out successfully.");
}