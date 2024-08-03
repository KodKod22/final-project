function setPagePosition(simulationName) {
    const pageHaed = document.getElementsByClassName("breadcrumb-item active")[0];
    while (pageHaed.firstChild) {
        pageHaed.removeChild(pageHaed.firstChild);
    };

    let newPageHead = document.createElement("a");
    newPageHead.innerText = simulationName.innerText;
    pageHaed.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[1];
    const remove = page.children[0];
    const courentPage = "דף בית > סימולציות אחרונות ";
    
    let newCurrentPage;
    newCurrentPage = courentPage + " > " + simulationName.innerText;
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

function toJoinWords(fiild,name){
    const FieldContainer = document.createElement("div");
    FieldContainer.classList.add("FieldContainer");
    const editingIcon = document.createElement("div");
    editingIcon.classList.add("editingIcon");
    editingIcon.onclick = editSimulation;
    const name1 = document.createElement("span");
    name1.innerText = name;
    fiild.classList.add("bold");
    FieldContainer.appendChild(fiild);
    FieldContainer.appendChild(name1);
    FieldContainer.appendChild(editingIcon);
    return FieldContainer;
}
function putSimulationInfo(element){
    const simulationInfo = document.createElement("div");
    
    let container1 = document.createElement("div");
    let container2 = document.createElement("div");
    let container3 = document.createElement("div");
    let container4 = document.createElement("div");
    let container5 = document.createElement("div");
    let container6 = document.createElement("div");
    let container7 = document.createElement("div");
    
    const simulationFild = document.createElement("span");
    simulationFild.textContent = "הסימולציה:"
    container1 = toJoinWords(simulationFild,element.simulationName);

    const locationFild = document.createElement("span");
    locationFild.textContent = "מיקום:"
    container2 = toJoinWords(locationFild,element.location);

    const afvToRescueFild = document.createElement("span");
    afvToRescueFild.textContent = "כלי תקוע:"
    container3 = toJoinWords(afvToRescueFild,element.afvToRescue);

    const RescueVehicleFild = document.createElement("span");
    RescueVehicleFild.textContent = "כלים מחלצים:"
    container4 = toJoinWords(RescueVehicleFild,element.RescueVehicle);

    const participantsFild = document.createElement("span");
    participantsFild.textContent = "משתתפים:"
    container5 = toJoinWords(participantsFild, element.participants);

    const difficultyFild = document.createElement("span");
    difficultyFild.textContent = "רמת קושי סימולציה:"
    container6 = toJoinWords(difficultyFild,element.difficulty);
    container6.removeChild(container6.lastChild);
    
    const dateFild = document.createElement("span");
    dateFild.textContent = "תאריך:"
    container7 = toJoinWords(dateFild,element.date);
    container7.removeChild(container7.lastChild);
    
    simulationInfo.appendChild(container1);
    simulationInfo.appendChild(container2);
    simulationInfo.appendChild(container3);
    simulationInfo.appendChild(container4);
    simulationInfo.appendChild(container5);
    simulationInfo.appendChild(container6);
    simulationInfo.appendChild(container7);
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
    const imgPlacholder = document.createElement("div");
    imgPlacholder.classList.add("imgPlacholder");
    const playIcon = document.createElement("div");
    playIcon.classList.add("playIcon");
    const simulationImg = document.createElement("img");
    simulationImg.src = element.simulationPic;
    simulationImg.title = element.simulationName;
    simulationImg.id = "simulationImg";
    imgPlacholder.appendChild(simulationImg);
    imgPlacholder.appendChild(playIcon);
    simulationSection.appendChild(simulationInfo);
    simulationSection.appendChild(imgPlacholder);
    
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
        window.history.back();
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
    if ((document.getElementsByClassName("simulationContainer")[0].style.display == "none")&&((document.getElementById("Simulationform").style.display == "block"))) {
        document.getElementsByClassName("simulationContainer")[0].style.display = "flex"
        document.getElementById("Simulationform").style.display = "none"
        
    }else{
        document.getElementsByClassName("simulationContainer")[0].style.display = "none"
        document.getElementById("Simulationform").style.display = "block"
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
    
    const matchingSoldirSection = document.getElementById("textContiner");
    const soldierData = JSON.parse(sessionStorage.getItem('soldierData'));

    const soldierName = document.createElement("span");
    soldierName.innerText = soldierData.soldierName;
    
    const soldierRole = document.createElement("span");
    soldierRole.innerText = soldierData.soldierRole;
    

    matchingSoldirSection.appendChild(soldierName);
    matchingSoldirSection.appendChild(soldierRole);
}

function changePage(){
    if ((document.getElementsByClassName("simulationContainer")[0].style.display == "none") && (document.getElementById("matchingSoldirSection").style.display == "flex")) {
        document.getElementsByClassName("simulationContainer")[0].style.display = "flex";
        document.getElementById("matchingSoldirSection").style.display = "none";
    }else{
        document.getElementsByClassName("simulationContainer")[0].style.display = "none";
        document.getElementById("matchingSoldirSection").style.display = "flex";
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
        const perntNode = checkBox.parentNode;
        let soldierNameHolder = perntNode.children[1];
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
    document.getElementById('addSimulationform').addEventListener('submit', getFormData);
    document.getElementById("matchToSoldier").onclick = changePage;
    document.getElementById("saveButton").onclick = getCheckBoxValue;        
}