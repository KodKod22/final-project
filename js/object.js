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
    locationStr.id = "soldierPic";

    profile_picture.appendChild(locationStr);

    objectContainer.appendChild(soldierNameStr);
    profile_info.appendChild(Date_of_birthStr);

    profile_info.appendChild(personal_numberStr);
    army_info.appendChild(roleStr);
    profile_info.appendChild(rankStr);
    army_info.appendChild(years_in_the_unitStr);
    army_info.appendChild(rifleryStr);
    
    profile_info.appendChild(army_info);

    objectContainer.appendChild(profile_info);
    objectContainer.appendChild(profile_picture);
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
