function mangeLogin(userData) {
    if (userData.user_name === "שמעון") {
        const data = {
            id: userData.users_id,
            userName: userData.user_name,
            profile: userData.profilePic
        };
        sessionStorage.setItem('userData', JSON.stringify(data));
        window.location.href = "index.html";   
    } else if (userData.user_name === "רותם") {
        const data = {
            id: userData.users_id,
            userName: userData.user_name,
            profile: userData.profilePic
        };
        sessionStorage.setItem('userData', JSON.stringify(data));
        window.location.href = "opertorHomePage.html";
    } else if (userData.user_name === "ארז") {
        const data = {
            id: userData.users_id,
            userName: userData.user_name,
            profile: userData.profilePic
        };
        sessionStorage.setItem('userData', JSON.stringify(data));
        window.location.href = "Home_Page.html";
    } else {
        console.error("User not recognized");
        
    }
}
function getUserFromServer(e) {
    e.preventDefault();
    
    const loginForm = document.getElementById("login-form");
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    fetchUser(username, password);
}

async function fetchUser(username, password) {
    try {
        const response = await fetch("https://final-project-serverside-0dnj.onrender.com/api/users/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, password: password })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return;
        }
        
        const data = await response.json();
        mangeLogin(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload = () => {
    document.getElementById('login-form-submit').addEventListener("click", getUserFromServer);
};

