function showSimulations(simulationsData) {
    const simulations = document.getElementById("simulation");
    let simulation;
    for (let index = 0; index < simulationsData.length; index++) {
        simulation = document.createElement("div");
        simulation.innerHTML = `<a href="simulationPage.html?simulationIndex=${index}">${simulationsData[index]}</a>`;
        simulations.appendChild(simulation);
    }
}

function setPagePosition(soldierName) {
    const pageHaed = document.getElementsByClassName("breadcrumb-item active")[0];
    const pageHaedChild = pageHaed.children[0];
    
    pageHaed.removeChild(pageHaedChild);

    let newPageHead = document.createElement("a");
    newPageHead.innerText = soldierName;
    pageHaed.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[1];
    const remove = page.children[0];
    const courentPage = remove.innerText;
    let newCurrentPage;
    newCurrentPage = courentPage + " > "+soldierName;
    let newA = document.createElement("a");
    newA.href = "SoldierListPage.html";
    newA.innerText = newCurrentPage;
    page.removeChild(remove);
    page.appendChild(newA);
}
function getSoldierId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const soldierId = aKeyValue[0].split("=")[1];
    return soldierId;
}
function deleteItem() {
    
    const deleteButton = this;
    const parentArticle = deleteButton.parentNode;
    const soldierInfo = parentArticle.children[1];
    const soldierName = soldierInfo.children[0].innerText;
    
    const soldierId = getSoldierId();

    const requestData = {
        id: soldierId,
        name: soldierName,
    };

    const requestJson = JSON.stringify(requestData);
    console.log('Prepared request delete:', requestJson);
    window.history.back();
}
function getArmyData(Data) {

    const armyData = document.getElementById("armyData");
    const role = document.createElement("span");
    role.innerText = "תפקיד: " + Data["role"];
    
    const rank = document.createElement("span");
    rank.innerText = "דרגה: " + Data["rank"];
    const yearsInTheUnit = document.createElement("span");
    yearsInTheUnit.innerText = "שנים ביחידה: " + Data["yearsInTheUnit"];
    
    armyData.appendChild(role);
    armyData.appendChild(rank);
    armyData.appendChild(yearsInTheUnit);

    return armyData;
}
function getPersonalInfo(data) {
    const PersonalInfo = document.getElementById("prsonalInfo");

    const personalNumber = document.createElement("span");
    personalNumber.innerText = "מספר אישי: "+ data["personalNumber"];

    const DateOfBirth = document.createElement("span");
    DateOfBirth.innerText = "תאריך לידה: " + data["DateOfBirth"];

    PersonalInfo.appendChild(personalNumber);
    PersonalInfo.appendChild(DateOfBirth);
    return  PersonalInfo; 
}
function getArmyInfo(Data){
    const armyInfo = document.getElementById("armyInfo");
    const armyData = {
        role: Data["role"],
        rank: Data["rank"],
        yearsInTheUnit: Data["yearsInTheUnit"]
    };

    const personalInfo = {
        personalNumber: Data["personalNumber"],
        DateOfBirth: Data["DateOfBirth"]
    }

    const setArmyData = getArmyData(armyData);
    const setPersonalInfo = getPersonalInfo(personalInfo);

    armyInfo.appendChild(setArmyData);
    armyInfo.appendChild(setPersonalInfo);

    return armyInfo;
}
function CreatePage(data) {
    let delete_pic = document.createElement("div");
    delete_pic.classList.add("delete");
    delete_pic.onclick = deleteItem;
    
    const objectContainer = document.getElementsByClassName("objectContainer")[0];

    const profile_picture = document.getElementById("profilePicture");
    let locationStr = document.createElement("img");
    locationStr.src = data["location"];
    locationStr.alt = data["soldierName"];
    profile_picture.appendChild(locationStr);


    const profileInfo = document.getElementById("profileInfo");
    const armyData = {
            personalNumber: data["personal number"],
            role: data["role"],
            rank: data["rank"],
            yearsInTheUnit: data["years in the unit"],
            riflery: data["riflery"],
            DateOfBirth: data["Date of birth"]
    };
    const armyInfo = getArmyInfo(armyData);
    const soldierName = document.createElement("h2");
    soldierName.innerText = data["soldier name"];
    setPagePosition(soldierName.innerText);

    profileInfo.appendChild(soldierName);
    profileInfo.appendChild(armyInfo);
    objectContainer.appendChild(profile_picture);
    objectContainer.appendChild(profileInfo);
    objectContainer.appendChild(delete_pic);
    showSimulations(data["simulations"]);
}
function showSelectedSoldier(data) 
{
    const selectionSoldierId = getSoldierId();
    for (const productKey in data.products) {
        let soldierObj = data.products[productKey];
        if (soldierObj.id == selectionSoldierId) {
            CreatePage(soldierObj);
            break;
        }
    }
}
window.onload = () => {
    fetch("data/soldier.json")
    .then(response => response.json())
    .then(data => showSelectedSoldier(data));
}

