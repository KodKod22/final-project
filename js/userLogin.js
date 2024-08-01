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
    const login = async () => {
        const response = await fetch("https://final-project-serverside-0dnj.onrender.com/api/post/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: 'username', password: 'password' })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            return;
        }
        
        const data = await response.json();
        console.log(data);
    };

    login();
};
        /*{
        userData = data.users;
        document.getElementById("login-form-submit").addEventListener("click",(e)=> mangeLogin(e,userData));
    });*/

