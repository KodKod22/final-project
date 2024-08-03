function setPagePosition(simulationName) {
    const pageHead = document.getElementsByClassName("breadcrumb-item active")[0];
    
    const pageHeadChild = pageHead.children[0];
    
    pageHead.removeChild(pageHeadChild);

    let newPageHead = document.createElement("a");
    newPageHead.innerText = simulationName;
    pageHead.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[2];
    const remove = page.children[0];
    const currentPage = remove.innerText;
    let newCurrentPage;
    newCurrentPage = currentPage + " > "+ simulationName;
    
    let newA = document.createElement("a");
    newA.href = "soldierListPage.html"
    newA.innerText = newCurrentPage;
    console.log(newA);
    page.removeChild(remove);
    page.appendChild(newA);
}
function getSimulation() {
    const aKeyValue = window.location.search.substring(1).split('&');
    const simulationId = aKeyValue[0].split("=")[1];
    
    return simulationId;
}

function showPage(data){
    let simulationObj = data[0];
   console
            setPagePosition(simulationObj["simulationName"]);          
            document.getElementById('simulationName').textContent = simulationObj.simulationName;
            document.getElementById('damageTool').textContent = simulationObj.afvToRescue;
            document.getElementById('rescueTools').textContent = simulationObj.RescueVehicle;
            document.getElementById('location').textContent = simulationObj.location;
            document.getElementById('driver').textContent = simulationObj.DriverID; 
            document.getElementById('teamMembers').textContent = simulationObj.TeamMember1ID +`, `+ simulationObj.TeamMember2ID +`, `+ simulationObj.TeamMember3ID;
            document.getElementById('commander').textContent = simulationObj.CommanderID;
            document.getElementById('safetyOfficer').textContent = simulationObj.SafetyOfficerID;
            document.getElementById('difficulty').textContent = simulationObj.difficulty;
            document.getElementById('date').textContent = simulationObj.date;
            document.getElementById('simulationVideo').src = simulationObj.video;
}     

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.onload = () => {
    let id = getQueryParam('soldierId');
    fetch(`https://final-project-serverside.onrender.com/api/soldiers/getSimulationRecord/${id}`)
    .then(response => response.json())
    .then(data => showPage(data))
    .catch(error => console.error('Error fetching the simulation data:', error));
}