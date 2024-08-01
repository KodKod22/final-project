function mangeLogin(e, userData) {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    for (const user of userData) {
        if (user.userName === username && user.password === password) {
            const data = {
                id: user.id,
                userName: user.userName,
                profile: user.profile
            };

            sessionStorage.setItem('userData', JSON.stringify(data));

            window.location.href = "Home_Page.html";
            break;
        }
    }
}

window.onload = () => {
    fetch("/api/users")
        .then(response => response.json())
        .then(data => {
            const userData = data.users;
            document.getElementById("login-form-submit").addEventListener("click", (e) => mangeLogin(e, userData));
        })
        .catch(error => console.error('Error loading JSON:', error));
};
