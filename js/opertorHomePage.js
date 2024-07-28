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
    simulationVideo.src = `${product.video}`;
    ArticleContent.appendChild(simulationVideo);
    ArticleContent.appendChild(createArticleInfo(product));
    return ArticleContent;
}
function createSimulationHolder(recordsData){
    const mainContainer = document.getElementsByClassName("mainContainer")[0];
    recordsData.simulations.forEach(product =>{
        const article = document.createElement("article");
        const title = document.createElement("span");
        title.classList.add("hebrewText");
        title.innerText = `${product.title}`;
        article.appendChild(title);

        article.appendChild(createArticleContent(product));
        mainContainer.appendChild(article);
    });
}
function initializeMain() {
    let recordsData;
    fetch("data/simulationRecords.json")
    .then(response => response.json())
    .then(data =>createSimulationHolder(data) );
        
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
    const storedData = JSON.parse(sessionStorage.getItem('userData'));
    for (const user of data.users){
        if (user.id === storedData.id) {
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