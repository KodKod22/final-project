window.onload = () => {    
    fetch("https://final-project-serverside.onrender.com/api/soldiers/SimulationsRecords")
        .then(Response => Response.json())
        .then(data =>{
                initialize(data)
                document.getElementById("simulationSourceBar").addEventListener("input",searchSoldiers);
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
        const article = document.createElement("article");
        article.setAttribute('data-id', product['soldierID']);
        article.classList.add("simulationRecordPlaceholder");
        let div = document.createElement("div");
        div.classList.add("recordInfo");
        let id = document.createElement("div");
        let simulationID = document.createElement("div");
        let date = document.createElement("div");
        let video = document.createElement("div");
        let simulationName = document.createElement("div");
        let location = document.createElement("div");
        let afvToRescue = document.createElement("div");
        let RescueVehicle = document.createElement("div");
        let difficulty = document.createElement("div");
        let commanderName = document.createElement("div");
        let driverName = document.createElement("div");
        let safetyOfficerName = document.createElement("div");
        let teamMember1Name = document.createElement("div");
        let teamMember2Name = document.createElement("div");
        let teamMember3Name = document.createElement("div");

        id.textContent = `ID: ${record['id']}`;
        simulationID.textContent = `Simulation ID: ${record['simulationID']}`;
        date.textContent = `Date: ${record['date']}`;
        video.innerHTML = `<iframe src="${record['video']}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        simulationName.textContent = `Simulation Name: ${record['simulationName']}`;
        location.textContent = `Location: ${record['location']}`;
        afvToRescue.textContent = `AFV to Rescue: ${record['afvToRescue']}`;
        RescueVehicle.textContent = `Rescue Vehicle: ${record['RescueVehicle']}`;
        difficulty.textContent = `Difficulty: ${record['difficulty']}`;
        commanderName.textContent = `Commander: ${record['CommanderName']}`;
        driverName.textContent = `Driver: ${record['DriverName']}`;
        safetyOfficerName.textContent = `Safety Officer: ${record['SafetyOfficerName']}`;
        teamMember1Name.textContent = `Team Member 1: ${record['TeamMember1Name']}`;
        teamMember2Name.textContent = `Team Member 2: ${record['TeamMember2Name']}`;
        teamMember3Name.textContent = `Team Member 3: ${record['TeamMember3Name']}`;

        div.appendChild(id);
        div.appendChild(simulationID);
        div.appendChild(date);
        div.appendChild(video);
        div.appendChild(simulationName);
        div.appendChild(location);
        div.appendChild(afvToRescue);
        div.appendChild(RescueVehicle);
        div.appendChild(difficulty);
        div.appendChild(commanderName);
        div.appendChild(driverName);
        div.appendChild(safetyOfficerName);
        div.appendChild(teamMember1Name);
        div.appendChild(teamMember2Name);
        div.appendChild(teamMember3Name);

        article.appendChild(div);
        main.appendChild(article);
    });
    document.getElementById("simulationCategoryMenu").style.display = "none";
    document.getElementById("difficultySubmenu").style.display = "none";
}

function searchSoldiers() {
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
