window.onload = () => {    
    fetch("data/soldier.json")
        .then(Response => Response.json())
        .then(data =>{
                initialize(data)
                document.getElementById("sourceBar").addEventListener("input",searchSoldiers);
        });
        document.getElementById("categoryButton").onclick = showFilers;

        document.getElementById("yearsInUnit").addEventListener("mouseover",(event) =>{
            document.getElementById("submenu").style.display = "block";
            document.getElementById("submenu").onclick = quickSearch;
        });
        document.getElementById("yearsInUnit").addEventListener("mouseout",(event) =>{
            document.getElementById("submenu").style.display = "none";
        });
        document.getElementById("submenu").addEventListener("li", (event) =>{
            
            quickSearch(event.target);
        });
}

function deleteItem() {
    const deleteButton = this;
    const parentArticle = deleteButton.parentNode;
    
    const soldierData = parentArticle.children[1];
    const soldierId = parentArticle.getAttribute('data-id');
    const soldierName = soldierData.querySelector('a').textContent;

    const requestData = {
        id: soldierId,
        name: soldierName,
    };

    const requestJson = JSON.stringify(requestData);
    console.log('Prepared request delete:', requestJson);
}
function quickSearch(text) {
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    const value = "שנים ביחידה:" + text.target.textContent;    
    for(i = 0; i < article.length ;i++){
        let x = article[i].getElementsByClassName("personalInfo")[0];
        let y = x.children[2];
        let yearsInTheUnit = y.children[0].textContent.trim(); 
        if(yearsInTheUnit === value){   
            continue
        }else{
            article[i].style.display = "none";
        }
    }       
}
function showFilers() {
    const categoryMenu = document.getElementById("categoryMenu");
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    if (!(categoryMenu.style.display === "block")) {
        categoryMenu.style.display = "block";
        for (let i = 0; i < article.length; i++) {
            article[i].style.display = "flex";
        }
    }else{
        categoryMenu.style.display = "none"
    }
}

function initialize(data) {
    
    const main = document.getElementsByClassName("mainContainer")[0];
    data.products.forEach(product => { 
        const article = document.createElement("article");
        article.setAttribute('data-id', product.id);
        article.classList.add("soldierPlaceholder");
        let div = document.createElement("div");
        div.classList.add("personalInfo");
        let li_soldierName = document.createElement("div");
        let li_role = document.createElement("div");
        let li_years = document.createElement("div");
        let soldierImg = document.createElement("img");
        soldierImg.src = `${product["location"]}`;
        soldierImg.alt = product["soldier name"];
        soldierImg.id = "soldierPic";
        li_soldierName.innerHTML = `<a href="soldierProfilePage.html?soldierId=${product.id}">${product["soldier name"]}</a>`;
        li_role.innerHTML = `<a href="soldierProfilePage.html?soldierId=${product.id}">תפקיד:${product["role"]}</a>`;
        li_years.innerHTML= `<a href="soldierProfilePage.html?soldierId=${product.id}"> שנים ביחידה:${product["years in the unit"]}</a>`;
        let delete_pic = document.createElement("div");
        delete_pic.classList.add("delete");
        delete_pic.onclick = deleteItem;

        article.appendChild(soldierImg);
        div.appendChild(li_soldierName);
        div.appendChild(li_role);
        div.appendChild(li_years);
        article.appendChild(div);
        article.appendChild(delete_pic);
        main.appendChild(article);
    });
    document.getElementById("categoryMenu").style.display = "none";
    document.getElementById("submenu").style.display = "none";
}

function searchSoldiers() {
    let inputField = document.getElementById("sourceBar");
    let value = inputField.value.toLowerCase();
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    if(inputField.value.trim() === "" || inputField.value.trim().length === 0){
        for(i=0;i<article.length;i++){
            article[i].style.display="flex";
        }
    }
    
    for(i = 0; i < article.length ;i++){
        let x = article[i].getElementsByClassName("personalInfo")[0];
        let solderName = x.children[0];
        let yearsInUnit = x.children[1];
        let soldierRole = x.children[2];
        if(solderName.innerHTML.includes(value)){
            article[i].style.display="flex";
        }else if(yearsInUnit.innerHTML.includes(value)) {
            article[i].style.display="flex";
        }else if(soldierRole.innerHTML.includes(value)){
            article[i].style.display="flex";
        }else {
            article[i].style.display="none";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const submenuRoles = document.getElementById('submenuRoles');

    fetch('https://final-project-serverside.onrender.com/api/soldiers/getRoles')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(roles => {
            roles.forEach(role => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${role.s_role}</span>`;
                submenuRoles.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching roles:', error);
            submenuRoles.innerHTML = '<li>Error loading roles</li>';
        });
});
