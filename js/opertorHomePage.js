function getUserId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const userId = aKeyValue[0].split("=")[1];
    return userId;
}
function createArticleInfo(product){
    const articleInfo = document.createElement("div");
    articleInfo.classList.add("articleInfo");

    const location = document.createElement("span");
    location.innerText = "מיקום:"+`${product.location}`
    const difficulty = document.createElement("span");
    difficulty.innerText = "רמת קושי:"+ `${product.difficulty}`;
    const date = document.createElement("span");
    date.innerText = "תאריך:"+`${product.date}`;
    const participants = document.createElement("span");
    participants.innerText = "משתתפים:"+`${product.participants}`;
    const teamMembers = document.createElement("span");
    teamMembers.innerText = "אנשי צוות:"+`${product.teamMembers}`
    const commander = document.createElement("span");
    commander.innerText ="מפקד:"+ `${product.commander}`;
    const safetyOfficer = document.createElement("span");
    safetyOfficer.innerText =  `${product.safetyOfficer}`;

    articleInfo.appendChild(location);
    articleInfo.appendChild(difficulty);
    articleInfo.appendChild(date);
    articleInfo.appendChild(participants);
    articleInfo.appendChild(teamMembers);
    articleInfo.appendChild(commander);
    articleInfo.appendChild(safetyOfficer);
    return articleInfo;
}
function createArticleContent(product) {
    const ArticleContent = document.createElement("div");
    ArticleContent.classList.add("ArticleContent");
    const simulationVideo = document.createElement("iframe");
    simulationVideo.src = embedUrl;
    simulationVideo.frameBorder = "0";
    simulationVideo.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    simulationVideo.allowFullscreen = true;
    simulationVideo.src = `${product.video}`;
    ArticleContent.appendChild(simulationVideo);
    ArticleContent.appendChild(createArticleInfo(product));
    return ArticleContent;
}
function createSimulationHolder(recordsData){
    console.log(recordsData);
    const mainContainer = document.getElementsByClassName("mainContainer")[0];

        for (let i = 0; i < recordsData.length; i++) {
            const article = document.createElement("article");
            const title = document.createElement("span");
            title.classList.add("hebrewText");
            title.innerText = recordsData[i].simulationName
            ;
            article.appendChild(title);

            article.appendChild(createArticleContent(recordsData[i]));
            mainContainer.appendChild(article);
        }
        
    
}
function initializeMain() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://final-project-serverside-0dnj.onrender.com/api/post/SimulationsRecords", requestOptions)
    .then(response => response.json())
    .then(date =>createSimulationHolder(date) );
        
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
function initialization() {
    const storedData = JSON.parse(sessionStorage.getItem('userData'));
    initializeProfile(storedData);
    initializeMain();
}
window.onload = () => {
    initialization();
}