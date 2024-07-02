function setPagePosition(simulationName) {
    const pageHaed = document.getElementsByClassName("breadcrumb-item active")[0];
    
    const pageHaedChild = pageHaed.children[0];
    
    pageHaed.removeChild(pageHaedChild);

    let newPageHead = document.createElement("a");
    newPageHead.innerText = simulationName;
    pageHaed.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[2];
    const remove = page.children[0];
    const courentPage = remove.innerText;
    let newCurrentPage;
    newCurrentPage = courentPage + " > "+ simulationName;
    
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
    const simulationId = getSimulation();
    for (const productKey in data.simulations){
        let simulationObj = data.simulations[productKey];
        if (simulationObj.id === simulationId){
            setPagePosition(simulationObj["title"]);          
            document.getElementById('simulation-title').textContent = simulationObj["title"];
            document.getElementById('simulation-name').textContent = simulationObj["simulationName"];
            document.getElementById('damage-tool').textContent = simulationObj["damageTool"];
            document.getElementById('rescue-tools').textContent = simulationObj["rescueTools"];
            document.getElementById('location').textContent = simulationObj["location"];
            document.getElementById('participants').textContent = simulationObj["participants"];
            document.getElementById('driver').textContent = simulationObj["driver"];
            document.getElementById('team-members').textContent = simulationObj["teamMembers"];
            document.getElementById('commander').textContent = simulationObj["commander"];
            document.getElementById('safety-officer').textContent = simulationObj["safetyOfficer"];
            document.getElementById('difficulty').textContent = simulationObj["difficulty"];
            document.getElementById('date').textContent = simulationObj["date"];
            document.getElementById('simulation-video').src = simulationObj["video"];
            break; 
        }
      
    }
}
window.onload = () => {
    fetch('data/simulation.json')
    .then(response => response.json())
    .then(data => showPage(data))
    .catch(error => console.error('Error fetching the simulation data:', error));
}
