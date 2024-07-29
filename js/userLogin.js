function mangeLogin(e, userData) {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    for (const user of userData) {
        if (user.userName === username && (user.password === password)) {
            if ( user.userName === "שמעון") {
                const data = {
                    id:user.id,
                    userName:user.userName,
                    profile:user.profile

                }
                sessionStorage.setItem('userData', JSON.stringify(data));
                window.location.href = "index.html";
                break;   
            }else if ( user.userName === "רותם") {
                const data = {
                    id:user.id,
                    userName:user.userName,
                    profile:user.profile

                }
                sessionStorage.setItem('userData', JSON.stringify(data));
                window.location.href = "opertorHomePage.html";
                break;
            }
        }
    }
}

window.onload = () => {
    fetch("../data/user.json")
    .then(response => response.json())
    .then(data => {
        userData = data.users;
        document.getElementById("login-form-submit").addEventListener("click",(e)=> mangeLogin(e,userData));
    });
};
