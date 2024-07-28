function setPagePosition(simulationName) {
    const pageHaed = document.getElementsByClassName("breadcrumb-item active")[0];
    const pageHaedChild = pageHaed.children[0];
    
    pageHaed.removeChild(pageHaedChild);

    let newPageHead = document.createElement("a");
    newPageHead.innerText = simulationName.innerText;
    pageHaed.appendChild(newPageHead);
    const page = document.getElementsByClassName("breadcrumb-item active")[1];
    const remove = page.children[0];
    const courentPage = remove.innerText;
    
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
    container1 = toJoinWords(simulationFild,element.simulation);

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
function loadSimulation(element){
    const mainContainer = document.getElementsByClassName("simulationContainer")[0];
    
    const simulationName = document.createElement("h1");
    simulationName.id = "simulationName";
    simulationName.classList.add("hebrewText");
    simulationName.innerText = element.simulationName;
    setPagePosition(simulationName);
    const simulationInfo = putSimulationInfo(element);
    simulationInfo.id = "simulationInfo";
    const simulationSection = document.createElement("div");
    simulationSection.classList.add("simulationSection");
    const imgPlacholder = document.createElement("div");
    imgPlacholder.classList.add("imgPlacholder");
    const playIcon = document.createElement("div");
    playIcon.classList.add("playIcon");
    const simulationImg = document.createElement("img");
    simulationImg.src = element.picture;
    simulationImg.title = element.simulationName;
    simulationImg.id = "simulationImg";
    imgPlacholder.appendChild(simulationImg);
    imgPlacholder.appendChild(playIcon);
    simulationSection.appendChild(simulationInfo);
    simulationSection.appendChild(imgPlacholder);
    
    const buttonsArea = document.getElementById("buttonsArea");
    
    mainContainer.insertBefore(simulationName, buttonsArea);
    mainContainer.insertBefore(simulationSection, buttonsArea);
}
function findSimulation(data){
    data.simulations.forEach(element =>{
        if (element.id === getSimulationId()) {
            loadSimulation(element);
        }
    });
}
function getSimulation(){
    fetch("data/simulations.json")
    .then(response => response.json())
    .then(data => findSimulation(data));
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
function initialization(data) {
    const storedData = JSON.parse(sessionStorage.getItem('userData'));
    for (const user of data.users){
        if (user.id === storedData.id) {
            initializeProfile(user);
            getSimulation();
            break;
        }
    }
}
function deleteSimulation() {

    const simulationId = getSimulationId();
    const mainContainer = document.getElementsByClassName("simulationContainer")[0];
    const simulationName = mainContainer.children[0];
    
    const requestData = {
        id: simulationId,
        name: simulationName.innerText,
    };
    
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
    
    
    matchSimulationToSoldier();
}

function getCheckBoxValue(){
    const checkBox = document.getElementById("checkboxSoldier");
    if (checkBox.checked) {
        const perntNode = checkBox.parentNode;
        const soldierName = perntNode.children[1];
        const simulationId = getSimulationId();

        const requestData = {
            soldierName: soldierName.innerText,
            simulationId: simulationId
        }
        
    }
    changePage();
}
window.onload = () => {
    fetch("data/user.json")
    .then(response => response.json())
    .then(data => initialization(data));
    document.getElementById("deleteSimulation").onclick = deleteSimulation;
    document.getElementById('addSimulationform').addEventListener('submit', getFormData);
    document.getElementById("matchToSoldier").onclick = changePage;
    document.getElementById("saveButton").onclick = getCheckBoxValue;        
}