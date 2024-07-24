function getUserId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const userId = aKeyValue[0].split("=")[1];
    return userId;
}
function initializeMain() {
    
}
function initializeProfile(user){
    const userName = document.getElementById("welcome");
    userName.innerText = "ברוכה הבא "+ user.userName;

    const profilePlaceHolder = document.getElementById("profilePlaceHolder");
    const profileImg = document.createElement("img");
    profileImg.src = user.profile;
    profileImg.alt = "commander";
    profileImg.classList.add("roundProfileImg");
    profilePlaceHolder.appendChild(profileImg);
}
function initialization(data) {
    for (const user of data.users){
        if (user.id === getUserId()) {
            initializeProfile(user);
            break;
        }
    }

    initializeMain();
}
window.onload = () => {
    fetch("data/user.json")
    .then(response => response.json())
    .then(data => initialization(data));
}