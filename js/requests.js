let isOpen = "";
function getUserId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const userId = aKeyValue[0].split("=")[1];
    return userId;
}
function putMessageText(data,Attribute){
    const MessageContinuer1 = document.getElementsByClassName("MessageContinuer")[0];
    data.requests.forEach(product =>{
        if (product.id === Attribute) {
            if (product.soldierName === undefined) {
                return;
            }
            const soldierName = document.createElement("span");
            soldierName.textContent = "שם החייל: "+`${product.soldierName}`;

            const mission = document.createElement("span");
            mission.textContent = "משימה: " + `${product.mission}`;

            const backStory = document.createElement("p");
            backStory.textContent = "סיפור רקע: " + `${product.backStory}`;

            const difficulty = document.createElement("span");
            difficulty.textContent = "רמת קושי: " + `${product.difficulty}`;

            const location = document.createElement("span");
            location.textContent ="מיקום: " + `${product.location}`;

            const sourceBar = document.createElement("div");
            sourceBar.classList.add("magnified");

            MessageContinuer1.appendChild(soldierName);
            MessageContinuer1.appendChild(mission);
            MessageContinuer1.appendChild(backStory);
            MessageContinuer1.appendChild(difficulty);
            MessageContinuer1.appendChild(location);
            MessageContinuer1.appendChild(sourceBar);
        }
    });
}
function getMessageText(Attribute) {
    fetch("data/requests.json")
    .then(response => response.json())
    .then(data => putMessageText(data,Attribute));    
}
function openMessed(){
    if (isOpen == false) {
        const openButton = this;
        const parentDiv = openButton.parentNode;
        const parentArticle = parentDiv.parentNode;
        const Attribute =  parentArticle.getAttribute('data-id');
        const textContainer = document.getElementById("requestsContainer");
        const MessageContinuer = document.createElement("div");
        MessageContinuer.classList.add("MessageContinuer");
        getMessageText(Attribute);
        parentArticle.parentNode.insertBefore(MessageContinuer, parentArticle.nextSibling); 
        isOpen = true;   
    }else {
        const MessageContinuer1 = document.getElementsByClassName("MessageContinuer")[0];
        MessageContinuer1.remove();
        isOpen = false;
    }   
}
function createRequest(data) {
    const textContainer = document.getElementById("requestsContainer");
    data.requests.forEach(product =>{
        const placeHolder = document.createElement("article");
        placeHolder.setAttribute('data-id', product.id);
        
        const profilePic = document.createElement("img");
        profilePic.src = `${product.pic}`;
        profilePic.classList.add("roundProfileImg");

        const div = document.createElement("div");
        div.classList.add("middleRightSideHolder");
        const topic = document.createElement("span");
        topic.textContent = `${product.Topic}`;
        const send =  document.createElement("span");
        send.id = "commenderName";
        send.textContent = `${product.sender}`;
        const div2 = document.createElement("div");
        const lockIcon = document.createElement("div");
        lockIcon.classList.add("lockIcon");
        lockIcon.onclick = openMessed;
        const date = document.createElement("span");
        date.textContent = `${product.date}`;

        const rightsideholder = document.createElement("div");
        rightsideholder.classList.add("rightsideholder");
        div2.appendChild(lockIcon);
        div2.appendChild(date);
        div.appendChild(topic);
        div.appendChild(send);
        rightsideholder.appendChild(profilePic);
        rightsideholder.appendChild(div);
        placeHolder.appendChild(rightsideholder);
        placeHolder.appendChild(div2);
        textContainer.appendChild(placeHolder);
    });
}
function InitializeRequestContainers(){
    const textContainer = document.getElementById("requestsContainer");
    const headerTopic = document.createElement("h2");
    headerTopic.textContent = "בקשות אירועים";
    textContainer.appendChild(headerTopic);
    fetch("data/requests.json")
    .then(response => response.json())
    .then(data => createRequest(data));

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
    InitializeRequestContainers();
}
window.onload = () => {
    fetch("data/user.json")
    .then(response => response.json())
    .then(data => initialization(data));
}