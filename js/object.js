function showSimulations(simulationsData) {
    const simulations = document.getElementsByClassName("simulation")[0];
    let simulation;
    for (let index = 0; index < simulationsData.length; index++) {
        simulation = document.createElement("div");
        simulation.innerHTML = `<a href="page4.html?simulationName=${simulationsData[index]}">${simulationsData[index]}</a>`;
        simulations.appendChild(simulation);
    }
}

function setPagePosition(soldierName) {
    const page = document.getElementById("pagePosition").children[1];
    page.innerText = page.innerText+" > "+soldierName;
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
function showSelectedSoldier(data) 
{
    const selectionSoldierId = getSoldierId();
    let soldierName;
    let personal_number;
    let role;
    let rank;
    let years_in_the_unit;
    let riflery;
    let Date_of_birth;
    let location;
    let simulations;
    for (const productKey in data.products) {
        let soldierObj = data.products[productKey];
        if (soldierObj.id == selectionSoldierId) {
            soldierName = soldierObj["soldier name"];
            setPagePosition(soldierName);
            personal_number = soldierObj["personal number"];
            role = soldierObj["role"];
            rank = soldierObj["rank"];
            years_in_the_unit = soldierObj["years in the unit"];
            riflery = soldierObj["riflery"];
            Date_of_birth = soldierObj["Date of birth"];
            location = soldierObj["location"];
            simulations = soldierObj["simulations"];
            break;
        }
    }
    const objectContainer = document.getElementsByClassName("objectContainer")[0];
    const profile_picture = document.getElementById("profile-picture");
    const profile_info = document.getElementsByClassName("profile-info")[0]; 
    const army_info = document.getElementsByClassName("army-info")[0];
    const prsonal_info = document.getElementsByClassName("prsonal-info")[0];
    const armyData = document.getElementsByClassName("armyData")[0];
    let soldierNameStr = document.createElement("h2");
    soldierNameStr.innerText = soldierName;
    let personal_numberStr = document.createElement("span");
    personal_numberStr.innerText ="מספר אישי:"+ personal_number;
    let roleStr = document.createElement("span");
    roleStr.innerText = "תפקיד:"+role;
    let rankStr = document.createElement("span");
    rankStr.innerText = "דרגה:"+ rank;
    let years_in_the_unitStr = document.createElement("span");
    years_in_the_unitStr.innerText ="שנים ביחידה:"+ years_in_the_unit;
    let rifleryStr = document.createElement("span");
    rifleryStr.innerText = "רובאי:"+riflery; 
    let Date_of_birthStr=document.createElement("span");
    Date_of_birthStr.innerText = "תאריך לידה:"+Date_of_birth;
    let locationStr=document.createElement("img");
    locationStr.src = location;
    locationStr.alt = soldierName;

    let delete_pic = document.createElement("div");
    delete_pic.classList.add("delete");
    delete_pic.onclick = deleteItem;


    prsonal_info.appendChild(personal_numberStr);
    prsonal_info.appendChild(Date_of_birthStr);
    profile_info.appendChild(soldierNameStr);
    armyData.appendChild(roleStr);
    armyData.appendChild(rankStr);
    armyData.appendChild(years_in_the_unitStr);
    prsonal_info.appendChild(rifleryStr);
    army_info.appendChild(prsonal_info);
    army_info.appendChild(armyData);
    profile_info.appendChild(army_info);
    profile_picture.appendChild(locationStr);
    objectContainer.appendChild(profile_picture);
    objectContainer.appendChild(profile_info);
    objectContainer.appendChild(delete_pic);
    showSimulations(simulations);
}
window.onload = () => {
    fetch("data/soldier.json")
    .then(response => response.json())
    .then(data => showSelectedSoldier(data));
    document.getElementById("backbutton").addEventListener("click",() => {
        history.back();
    });
}
