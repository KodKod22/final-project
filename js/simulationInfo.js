function setPagePosition(simulationName) {
    const pageHead = document.getElementsByClassName("breadcrumb-item active")[0];
    while (pageHead.firstChild) {
        pageHead.removeChild(pageHead.firstChild);
    };

    let newPageHead = document.createElement("a");
    newPageHead.innerText = simulationName.innerText;
    pageHead.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[1];
    const remove = page.children[0];
    const courantPage = "דף בית > סימולציות אחרונות ";
    
    let newCurrentPage;
    newCurrentPage = courantPage + " > " + simulationName.innerText;
    let newA = document.createElement("a");
    newA.href = "simulationsList.html";
    newA.innerText = newCurrentPage;
    page.removeChild(remove);
    page.appendChild(newA);
}
function getSimulationId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const SimulationId = aKeyValue[0].split("=")[1];
    return SimulationId;
}

function toJoinWords(field,name){
    const FieldContainer = document.createElement("div");
    FieldContainer.classList.add("FieldContainer");
    const editingIcon = document.createElement("div");
    editingIcon.classList.add("editingIcon");
    editingIcon.onclick = editSimulation;
    const name1 = document.createElement("span");
    name1.innerText = name;
    field.classList.add("bold");
    FieldContainer.appendChild(field);
    FieldContainer.appendChild(name1);
    FieldContainer.appendChild(editingIcon);
    return FieldContainer;
}
function putSimulationInfo(element){
    const simulationInfo = document.createElement("div");
    
    let simulationContainer = document.createElement("div");
    let locationContainer = document.createElement("div");
    let afvToRescueContainer = document.createElement("div");
    let RescueVehicleContainer = document.createElement("div");
    let participantsContainer = document.createElement("div");
    let difficultyContainer = document.createElement("div");
    let dateContainer = document.createElement("div");
    
    const simulationField = document.createElement("span");
    simulationField.textContent = "הסימולציה:"
    simulationContainer = toJoinWords(simulationField,element.simulationName);

    const locationField = document.createElement("span");
    locationField.textContent = "מיקום:"
    locationContainer = toJoinWords(locationField,element.location);

    const afvToRescueField = document.createElement("span");
    afvToRescueField.textContent = "כלי תקוע:"
    afvToRescueContainer = toJoinWords(afvToRescueField,element.afvToRescue);

    const RescueVehicleField = document.createElement("span");
    RescueVehicleField.textContent = "כלים מחלצים:"
    RescueVehicleContainer = toJoinWords(RescueVehicleField,element.RescueVehicle);

    const participantsField = document.createElement("span");
    participantsField.textContent = "משתתפים:"
    participantsContainer = toJoinWords(participantsField, element.participants);

    const difficultyField = document.createElement("span");
    difficultyField.textContent = "רמת קושי סימולציה:"
    difficultyContainer = toJoinWords(difficultyField,element.difficulty);
    difficultyContainer.removeChild(difficultyContainer.lastChild);
    
    const dateField = document.createElement("span");
    dateField.textContent = "תאריך:"
    dateContainer = toJoinWords(dateField,element.date);
    dateContainer.removeChild(dateContainer.lastChild);
    
    simulationInfo.appendChild(simulationContainer);
    simulationInfo.appendChild(locationContainer);
    simulationInfo.appendChild(afvToRescueContainer);
    simulationInfo.appendChild(RescueVehicleContainer);
    simulationInfo.appendChild(participantsContainer);
    simulationInfo.appendChild(difficultyContainer);
    simulationInfo.appendChild(dateContainer);
    return simulationInfo;
}
function loadSimulation(elements){
    const element = elements[0];
    
    const mainContainer = document.getElementsByClassName("simulationContainer")[0];
    while (mainContainer.firstChild) {
        if(mainContainer.firstChild === document.getElementById("buttonsArea")){
            break;
        }
        mainContainer.removeChild(mainContainer.firstChild);
    }
    const nameSimulation = document.createElement("h1");
    nameSimulation.id = "nameSimulation";
    nameSimulation.classList.add("hebrewText");
    nameSimulation.textContent = element.simulationName;
    setPagePosition(nameSimulation);
    const simulationInfo = putSimulationInfo(element);
    simulationInfo.id = "simulationInfo";
    const simulationSection = document.createElement("div");
    simulationSection.classList.add("simulationSection");
    const imgPlaceholder = document.createElement("div");
    imgPlaceholder.classList.add("imgPlaceholder");
    const playIcon = document.createElement("div");
    playIcon.classList.add("playIcon");
    const simulationImg = document.createElement("img");
    simulationImg.src = element.simulationPic;
    simulationImg.title = element.simulationName;
    simulationImg.id = "simulationImg";
    imgPlaceholder.appendChild(simulationImg);
    imgPlaceholder.appendChild(playIcon);
    simulationSection.appendChild(simulationInfo);
    simulationSection.appendChild(imgPlaceholder);
    
    const buttonsArea = document.getElementById("buttonsArea");
    
    mainContainer.insertBefore(nameSimulation, buttonsArea);
    mainContainer.insertBefore(simulationSection, buttonsArea);
}

async function getSimulation(){
 
    const simulation_Id = getSimulationId();
    
    const response = await fetch("https://final-project-serverside-0dnj.onrender.com/api/post/Simulation",{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ simulationId: simulation_Id })
    })
    const data = await response.json();
    loadSimulation(data);
}
function initializeProfile(user){
    const userName = document.getElementById("welcome");
    userName.innerText = "ברוך הבא "+ user.userName;
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
    getSimulation();
    matchSimulationToSoldier();
}
async function sendDeleteRequest(requestData){
    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ SimulationId:requestData.id,simulationName:requestData.name}),
        redirect: "follow"
    };
        const response = await fetch("https://final-project-serverside-0dnj.onrender.com/api/post/deleteSimulations", requestOptions);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return;
        }
        
        sessionStorage.setItem('refreshBack', 'true');
        history.back();

    }
function deleteSimulation() {

    const simulationId = getSimulationId();
    const mainContainer = document.getElementsByClassName("simulationContainer")[0];
    const simulationName = mainContainer.children[0];
    
    const requestData = {
        id: simulationId,
        name: simulationName.innerText,
    };
    sendDeleteRequest(requestData);   
}
function editSimulation(){
    if ((document.getElementsByClassName("simulationContainer")[0].style.display == "none")&&((document.getElementById("SimulationForm").style.display == "block"))) {
        document.getElementsByClassName("simulationContainer")[0].style.display = "flex"
        document.getElementById("SimulationForm").style.display = "none"
        
    }else{
        document.getElementsByClassName("simulationContainer")[0].style.display = "none"
        document.getElementById("SimulationForm").style.display = "block"
    }
}
async function sendUpdateRequest(updateRequest){
    
    try {
        const response = await fetch("https://final-project-serverside-0dnj.onrender.com/api/post/updateSimulation", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id:updateRequest.id,simulation:updateRequest.simulation, AfvToRescue:updateRequest.AfvToRescue,
                RescueVehicle:updateRequest.RescueVehicle,
                Participants: updateRequest.Participants,
                Location: updateRequest.Location})
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return;
        }
        await getSimulation();
    } catch (error) {
        console.error('Error:', error);
    }
}

function getFormData(event){
    
    event.preventDefault();
    const simulationId = getSimulationId();
    const formData = new FormData(event.target);
    const simulationDescribe = formData.get('simulation');
    const afvToRescue = formData.get('afvToRescue');
    const rescueVehicle = formData.get('RescueVehicle');
    const participants = formData.get('participants');
    const location = formData.get('location');
    
    const updateRequest ={
        id: simulationId,
        simulation: simulationDescribe,
        AfvToRescue: afvToRescue,
        RescueVehicle: rescueVehicle,
        Participants: participants,
        Location: location
    }
    sendUpdateRequest(updateRequest);
    editSimulation();
}

function matchSimulationToSoldier(){
    const soldierData = JSON.parse(sessionStorage.getItem('soldierData'));
    
    if (!soldierData) {
        return;
    }
    const matchingSoldierSection = document.getElementById("textContainer");


    const soldierName = document.createElement("span");
    soldierName.innerText = soldierData.soldierName;
    
    const soldierRole = document.createElement("span");
    soldierRole.innerText = soldierData.soldierRole;
    

    matchingSoldierSection.appendChild(soldierName);
    matchingSoldierSection.appendChild(soldierRole);
}
function checkSimulationLevelAndLocation() {
    
    const soldierData = JSON.parse(sessionStorage.getItem('soldierData'));
    const container = document.getElementById("simulationInfo");
    const locationField = container.querySelectorAll(".FieldContainer")[1];
    const difficultyField = container.querySelectorAll(".FieldContainer")[5];

    let locationCheck = false;
    let difficultyCheck = false;

    
    const locationElement = locationField.children[1];
    
        
    if (soldierData.location.includes(locationElement.textContent)) {
        locationCheck = true;
        }

    const difficultyElement = difficultyField.children[1];
        if (soldierData.difficulty.includes(difficultyElement.textContent)) {
            difficultyCheck = true;
            
        }


    return locationCheck && difficultyCheck;
}



function changePage(){

    if (!checkSimulationLevelAndLocation()) {
        return;        
    }
    if ((document.getElementsByClassName("simulationContainer")[0].style.display == "none") && (document.getElementById("matchingSoldierSection").style.display == "flex")) {
        document.getElementsByClassName("simulationContainer")[0].style.display = "flex";
        document.getElementById("matchingSoldierSection").style.display = "none";
    }else{
        document.getElementsByClassName("simulationContainer")[0].style.display = "none";
        document.getElementById("matchingSoldierSection").style.display = "flex";
    }
    
}
async function sendMatchSimulationRequest(requestData) {
    
    try {
        const response = await fetch("https://final-project-serverside-0dnj.onrender.com/api/post/addMission", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ soldierName:requestData.soldierName,simulationID:requestData.simulationId})
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return;
        }
        await getSimulation();
    } catch (error) {
        console.error('Error:', error);
    }
}
function getCheckBoxValue(){
    const checkBox = document.getElementById("checkboxSoldier");
    if (checkBox.checked) {
        const parentNode = checkBox.parentNode;
        let soldierNameHolder = parentNode.children[1];
        const textSoldierName = soldierNameHolder.textContent.split(":")
        const soldierName = textSoldierName[1].trimStart()
        
        const simulationId = getSimulationId();

        const requestData = {
            soldierName: soldierName,
            simulationId: simulationId
        }
        sendMatchSimulationRequest(requestData);
    }
    changePage();
}
window.onload = () => {
    
    initialization();
    document.getElementById("deleteSimulation").onclick = deleteSimulation;
    document.getElementById('addSimulationForm').addEventListener('submit', getFormData);
    document.getElementById("matchToSoldier").onclick = changePage;
    document.getElementById("saveButton").onclick = getCheckBoxValue;        
}