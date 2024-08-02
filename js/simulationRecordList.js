window.onload = () => {    
    fetch("https://final-project-serverside.onrender.com/api/soldiers/SimulationsRecords")
        .then(Response => Response.json())
        .then(data =>{
                initialize(data);
                document.getElementById("simulationSourceBar").addEventListener("input",searchRecord);
                createSimulationHolder(data);
        })
        .catch(error => console.error('Error fetching data:', error));

        document.getElementById("simulationCategoryButton").onclick = showFilers;
        document.getElementById("difficulty").addEventListener("mouseover",(event) =>{
            document.getElementById("difficultySubmenu").style.display = "block";
            document.getElementById("difficultySubmenu").onclick = difficultySearch;
        });
        
        document.getElementById("difficulty").addEventListener("mouseout",(event) =>{
            document.getElementById("difficultySubmenu").style.display = "none";
        });
        document.getElementById("afv").addEventListener("mouseover",(event) =>{
            document.getElementById("afvSubmenu").style.display = "block";
        });

        document.getElementById("afv").addEventListener("mouseout",(event) =>{
            document.getElementById("afvSubmenu").style.display = "none";
        });
        document.getElementById("difficultySubmenu").addEventListener("click", (event) =>{ 
            difficultySearch(event.target);
        });
        document.getElementById("afvSubmenu").addEventListener("click", (event) =>{
            afvSearch(event.target.innerText);
        });
}

function difficultySearch(text) {
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    const value = "רמת קושי:" + text.target.textContent;
    console.log(value);    
    for(i = 0; i < article.length ;i++){
        let x = article[i].getElementsByClassName("recordInfo")[0];
        let y = x.children[2];
        let difficulty = y.children[0].textContent.trim(); 
        if(difficulty === value){   
            continue;
        }else{
            article[i].style.display = "none";
        }
    }       
}

function afvSearch(afvToRescue) {
    const main = document.getElementsByClassName("mainContainer")[0];
    let articles = main.getElementsByTagName("article");    
    for(var i = 0; i < articles.length; i++){
        let x = articles[i].getElementsByClassName("recordInfo")[0];
        let y = x.children[1];
        let targetAFV = y.children[0].textContent.trim().split(':')[1];
        if(targetAFV != afvToRescue) {   
            articles[i]['style']['display'] = "none";
        }
    }       
}

function getAFVs() {
    let afv = {};

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://final-project-serverside.onrender.com/api/soldiers/getAFVs", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        const ul = document.getElementById("afvSubmenu");
        result = JSON.parse(result);
        console.log(result);
        for(var afv in result) {
            console.log(afv);
            var li = document.createElement("li");
            var span = document.createElement("span");
            li.appendChild(span.appendChild(document.createTextNode(result[afv]['afvToRescue'])));
            ul.appendChild(li);
        }
    })
    .catch((error) => console.error(error));
}  

function showFilers() {
    const simulationCategoryMenu = document.getElementById("simulationCategoryMenu");
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    if (!(simulationCategoryMenu.style.display === "block")) {
        simulationCategoryMenu.style.display = "block";
        for (let i = 0; i < article.length; i++) {
            article[i].style.display = "flex";
        }
    }else{
        simulationCategoryMenu.style.display = "none"
    }
}

function initialize(data) {
    const main = document.getElementsByClassName("mainContainer")[0];
    data.forEach(product => { 
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
    });
    document.getElementById("simulationCategoryMenu").style.display = "none";
    document.getElementById("difficultySubmenu").style.display = "none";
    getAFVs();
}

function addTeamMembers(params) {
    const teamMembers = [params.TeamMember1Name,params .TeamMember2Name, params.TeamMember3Name]
        .filter(name => name !== null)
        .join(", ");
    return teamMembers;
}

function getUserId() {
    const aKeyValue = window.location.search.substring(1).split('&');
    const userId = aKeyValue[0].split("=")[1];
    return userId;
}

function createArticleInfo(product) {
    const articleInfo = document.createElement("div");
    articleInfo.classList.add("articleInfo");

    const location = document.createElement("span");
    location.innerText = "מיקום:" + `${product.location}`;
    const difficulty = document.createElement("span");
    difficulty.innerText = "רמת קושי:" + `${product.difficulty}`;
    const date = document.createElement("span");
    date.innerText = "תאריך:" + `${product.date}`;
    const participants = document.createElement("span");

    const teamMembers = document.createElement("span");
    teamMembers.innerText = "אנשי צוות:" + addTeamMembers(product);
    const commander = document.createElement("span");
    commander.innerText = "מפקד:" + `${product.CommanderName}`;
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

function createSimulationHolder(recordsData) {
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

function searchRecord() {
    let inputField = document.getElementById("simulationSourceBar");
    let value = inputField.value.toLowerCase();
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    if(inputField.value.trim() === "" || inputField.value.trim().length === 0){
        for(i=0;i<article.length;i++){
            article[i].style.display="flex";
        }
    }
    
    for (let i = 0; i < article.length; i++) {
        let x = article[i].getElementsByClassName("recordInfo")[0];
        let commanderName = x.children[9].textContent.toLowerCase();
        let driverName = x.children[10].textContent.toLowerCase();
        let safetyOfficerName = x.children[11].textContent.toLowerCase();
        let teamMember1Name = x.children[12].textContent.toLowerCase();
        let teamMember2Name = x.children[13].textContent.toLowerCase();
        let teamMember3Name = x.children[14].textContent.toLowerCase();

        if (commanderName.includes(value) || driverName.includes(value) || safetyOfficerName.includes(value) ||
            teamMember1Name.includes(value) || teamMember2Name.includes(value) || teamMember3Name.includes(value)) {
            article[i].style.display = "flex";
        } else {
            article[i].style.display = "none";
        }
    }
}