function getUserId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const userId = aKeyValue[0].split("=")[1];
    return userId;
}
function addTeamMembers(params) {
    const teamMembers = [params.TeamMember1Name,params .TeamMember2Name, params.TeamMember3Name]
        .filter(name => name !== null)
        .join(", ");
    return teamMembers;
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
    
    const teamMembers = document.createElement("span");
    
    teamMembers.innerText = "אנשי צוות:"+ addTeamMembers(product);
    const commander = document.createElement("span");
    commander.innerText ="מפקד:"+ `${product.CommanderName}`;
    const safetyOfficer = document.createElement("span");
    safetyOfficer.innerText = "קצין בטיחות:" + `${product.SafetyOfficerName}`;

    articleInfo.appendChild(location);
    articleInfo.appendChild(difficulty);
    articleInfo.appendChild(date);
    
    articleInfo.appendChild(teamMembers);
    articleInfo.appendChild(commander);
    articleInfo.appendChild(safetyOfficer);
    return articleInfo;
}
function createArticleContent(product) {
    const ArticleContent = document.createElement("div");
    ArticleContent.classList.add("ArticleContent");

    
    const simulationVideo = document.createElement("iframe");
    
    simulationVideo.src = product.video;
    simulationVideo.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    simulationVideo.allowFullscreen = true;
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
            
            title.innerText = recordsData[i].simulationName;
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