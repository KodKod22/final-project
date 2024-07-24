function mangeLogin(e, userData) {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");
    const username = loginForm.username.value;

    for (const user of userData) {
        if (user.userName === username) {
            if ( user.userName === "שמעון") {
                window.location.href = `index.html?userIndex=${user.id}`;
                break;   
            }else if ( user.userName === "רותם") {
                window.location.href = `opertorHomePage.html?userIndex=${user.id}`;
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
