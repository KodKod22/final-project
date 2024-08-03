function showSimulations(simulationsData) {
    const simulations = document.getElementById("simulation");
    let simulation;
    for (let index = 0; index < simulationsData.length; index++) {
        simulation = document.createElement("div");
        simulation.innerHTML = `<a href="simulationPage.html?simulationIndex=${index}">${simulationsData[index].simulationName}</a>`;
        simulations.appendChild(simulation);
    }
}

function setPagePosition(soldierName) {
    const pageHead = document.getElementsByClassName("breadcrumb-item active")[0];
    const pageHeadChild = pageHead.children[0];
    
    pageHead.removeChild(pageHeadChild);

    let newPageHead = document.createElement("a");
    newPageHead.innerText = soldierName;
    pageHead.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[1];
    const remove = page.children[0];
    const currentPage = remove.innerText;
    let newCurrentPage;
    newCurrentPage = currentPage + " > "+soldierName;
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
const formatDate = (dateStr) => {
    let date = new Date(dateStr);

    let day = String(date.getUTCDate()).padStart(2, '0');
    let month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = date.getUTCFullYear();

    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}

function CreatePage(data, simulation) {
    let delete_pic = document.createElement("div");
    delete_pic.classList.add("delete");
    delete_pic.onclick = deleteItem;
    
    const objectContainer = document.getElementsByClassName("objectContainer")[0];

    const profile_picture = document.getElementById("profilePicture");
    let imgStr = document.createElement("img");
    imgStr.src = data["s_img"];
    imgStr.alt = data["name"];
    profile_picture.appendChild(imgStr);


    const profileInfo = document.getElementById("profileInfo");
    const armyData = {
            personalNumber: data["soldierID"],
            role: data["role"],
            rank: data["rank"],
            yearsInTheUnit: data["yearsInTheUnits"],
            riflery: data["riflery"],
            DateOfBirth: formatDate(data["dateOfBirth"])
    };
    const armyInfo = getArmyInfo(armyData);
    const soldierName = document.createElement("h2");
    soldierName.innerText = data["name"];
    setPagePosition(soldierName.innerText);

    profileInfo.appendChild(soldierName);
    profileInfo.appendChild(armyInfo);
    objectContainer.appendChild(profile_picture);
    objectContainer.appendChild(profileInfo);
    objectContainer.appendChild(delete_pic);
    showSimulations(simulation);
}
function showSelectedSoldier(data) 
{
    const soldier = data[0];
    let simulations = [];
    data.forEach(soldier => {
        simulations.push({
            simulationID: soldier.simulationID,
            driverID: soldier.driverID,
            teamMemberIDs: [soldier.teamMember1ID, soldier.teamMember2ID, soldier.teamMember3ID],
            commanderID: soldier.commanderID,
            safetyOfficerID: soldier.safetyOfficerID,
            date: formatDate(soldier.date),
            video: soldier.video,
            simulationName: soldier.simulationName
        })
    });
    CreatePage(soldier, simulations);
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.onload = () => {

    let soldierId = getQueryParam('soldierId');

    fetch(`https://final-project-serverside.onrender.com/api/soldiers/getSoldiersProfile/${soldierId}`)
    .then(response => response.json())
    .then(data => showSelectedSoldier(data));
}

