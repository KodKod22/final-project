let subMenu;
function getUserId() 
{
    const aKeyValue = window.location.search.substring(1).split('&');
    const userId = aKeyValue[0].split("=")[1];
    return userId;
}
function setCategory(menuItems,subMenu) {
    const categoryMenuUl = document.getElementById("simulationCategoryMenu");

    menuItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        li.id = "li"+item.id;
        const additionalElement = document.createElement("div");
        additionalElement.classList.add("arrow");
        li.appendChild(additionalElement);
        categoryMenuUl.appendChild(li);

        
        const nestedUl = document.createElement("ul");
        nestedUl.classList.add ("submenu1"); 
        li.appendChild(nestedUl);
    });
    const li2 = document.getElementById("li2");
    if (li2) {
        li2.addEventListener("mouseover", (event) => {
            const submenu = li2.querySelector('.submenu1');
            submenu.style.display = "block";
            setSubCategory(subMenu);
            li2.querySelector('.submenu1').onclick = quickSearch;
        });

        li2.querySelector('.submenu1').addEventListener("li", (event) =>{
            quickSearch(this);
        });

        li2.addEventListener("mouseout", (event) => {
            const submenu = li2.querySelector('.submenu1');
            submenu.style.display = "none";
        });
    }

}
function filtering(article,text){
    for(i = 0; i < article.length ;i++){
        let x = article[i].getElementsByClassName("infoContainer")[0];
        let y = x.children[3]; 
        if(y.innerText.includes(text)){
            continue
        }else{
            article[i].style.display = "none";
        }
    }       
}
function quickSearchByRequest(text){
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("a");
    filtering(article,text);
}
function quickSearch(text) {
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("a");
    const value = text.target.textContent;
    
    filtering(article,value);
}
function showFilers() {
    const categoryMenu = document.getElementById("categoryMenu");
    const main = document.getElementsByClassName("mainContainer")[0];
    let a = main.getElementsByTagName("a");
    if (!(categoryMenu.style.display === "block")) {
        categoryMenu.style.display = "block";
        for (let i = 0; i < article.length; i++) {
            a[i].style.display = "flex";
        }
    }else{
        categoryMenu.style.display = "none"
    }
}
function setSubCategory(subMenu) {
    
    const nestedUl = document.getElementById("li2");
    
    let subUl = nestedUl.querySelector('ul');
    let subli = subUl.querySelector('li');
    if (!subli) {

        for (let i = 0; i < subMenu.length; i++) {
            const li = document.createElement("li");
            li.textContent = `${subMenu[i].name}`;
            const additionalElement = document.createElement("div");
            additionalElement.classList.add("arrow");
            li.appendChild(additionalElement);

            subUl.appendChild(li);    
        }
    nestedUl.appendChild(subUl);    
    }else {
        return;
    }
    
}
function initializationCategory() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    
    fetch("https://final-project-serverside-0dnj.onrender.com/categories",requestOptions)
    .then(response =>  response.json())
    .then(data => { 
        const topMenu = data.categories.find(menu => menu.category === "categoryMenu").categoryMenu;
        const subMenu = data.categories.find(menu => menu.category === "categorySubMenu").categorySubMenu;
        setCategory(topMenu,subMenu);
    })
        
    
}
function initializationSimulations(data){
    const soldierData = JSON.parse(sessionStorage.getItem('soldierData'));
    const mainContainer = document.getElementsByClassName("mainContainer")[0];
    data.forEach(element => {
        const simulationPlaceHolder = document.createElement("a");
        simulationPlaceHolder.href = `simulationInfo.html?SimulationId=${element.id}`;
        simulationPlaceHolder.classList.add("simulationPlaceHolder");
        const img = document.createElement("img");
        img.src = `${element.simulationPic}`;
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("infoContainer");

        const simulationName = document.createElement("span");
        simulationName.innerText = "שם:"+`${element.simulationName}`;
        const location = document.createElement("span");
        location.innerText = "מיקום:"+`${element.location}`
        const afvToRescue = document.createElement("span");
        afvToRescue.innerText ="כלי תקוע:" + `${element.afvToRescue}`;
        const difficulty = document.createElement("span");
        difficulty.innerText ="רמה:" + `${element.difficulty}`

        infoContainer.appendChild(simulationName);
        infoContainer.appendChild(location);
        infoContainer.appendChild(afvToRescue);
        infoContainer.appendChild(difficulty);
        simulationPlaceHolder.appendChild(img);
        simulationPlaceHolder.appendChild(infoContainer);
        mainContainer.appendChild(simulationPlaceHolder);
    });
    if (soldierData) {
        
        quickSearchByRequest(soldierData.difficulty);
    }
}

function getSimulations(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://final-project-serverside-0dnj.onrender.com/api/post/Simulations", requestOptions)
    .then(response => response.json())
    .then(date =>initializationSimulations(date) );
    
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
    initializationCategory();
    getSimulations();
    document.getElementById("simulationCategoryMenu").style.display = "none";
}
function showFilers() {
    const categoryMenu = document.getElementById("simulationCategoryMenu");
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("a");
    if (!(categoryMenu.style.display === "block")) {
        categoryMenu.style.display = "block";
        for (let i = 0; i < article.length; i++) {
            article[i].style.display = "flex";
        }
    }else{
        categoryMenu.style.display = "none"
    }
}
function searchSimulations() {
    let inputField = document.getElementById("sourceBar");
    let value = inputField.value.toLowerCase();
    const main = document.getElementsByClassName("mainContainer")[0];
    let a = main.getElementsByTagName("a");
    if(inputField.value.trim() === "" || inputField.value.trim().length === 0){
        for(i = 0; i < a.length; i++){
            a[i].style.display="flex";
        }
    }
    for(i = 0; i < a.length ;i++){
        let x = a[i].getElementsByClassName("infoContainer")[0];
        let simulationName = x.children[0];
        let location = x.children[1];
        let afvToRescue = x.children[2];
        if(simulationName.innerHTML.includes(value)){
            a[i].style.display="flex";
        }else if(location.innerHTML.includes(value)) {
            a[i].style.display="flex";
        }else if(afvToRescue.innerHTML.includes(value)){
            a[i].style.display="flex";
        }else {
            a[i].style.display="none";
        }
    }
}


window.onload = () => {
        initialization()
        document.getElementById("sourceBar").addEventListener("input",searchSimulations);
        document.getElementById("categoryButton").onclick = showFilers;
}
    