window.onload = () => {    
    fetch("https://final-project-serverside.onrender.com/api/soldiers/getSoldiers")
        .then(Response => Response.json())
        .then(data =>{
                initialize(data)
                document.getElementById("sourceBar").addEventListener("input",searchSoldiers);
        })
        .catch(error => console.error('Error fetching data:', error));

        document.getElementById("categoryButton").onclick = showFilers;
        document.getElementById("yearsInUnit").addEventListener("mouseover",(event) =>{
            document.getElementById("submenu").style.display = "block";
            document.getElementById("submenu").onclick = quickSearch;
        });

        document.getElementById("yearsInUnit").addEventListener("mouseout",(event) =>{
            document.getElementById("submenu").style.display = "none";
        });
        document.getElementById("role").addEventListener("mouseover",(event) =>{
            document.getElementById("submenuRoles").style.display = "block";
        });

        document.getElementById("role").addEventListener("mouseout",(event) =>{
            document.getElementById("submenuRoles").style.display = "none";
        });
        document.getElementById("submenu").addEventListener("click", (event) =>{ 
            quickSearch(event.target);
        });
        document.getElementById("submenuRoles").addEventListener("click", (event) =>{
            unitSearch(event.target.innerText);
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
            continue;
        }else{
            article[i].style.display = "none";
        }
    }       
}

function unitSearch(role) {
    const main = document.getElementsByClassName("mainContainer")[0];
    let articles = main.getElementsByTagName("article");    
    for(var i = 0; i < articles.length; i++){
        let x = articles[i].getElementsByClassName("personalInfo")[0];
        let y = x.children[1];
        let targetRole = y.children[0].textContent.trim().split(':')[1];
        if(targetRole != role) {   
            articles[i]['style']['display'] = "none";
        }
    }       
}

function getRoles() {

    let roles = {};

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://final-project-serverside.onrender.com/api/soldiers/getRoles", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        const ul = document.getElementById("submenuRoles");
        result = JSON.parse(result);
        for(var role in result) {
            var li = document.createElement("li");
            var span = document.createElement("span");
            li.appendChild(span.appendChild(document.createTextNode(result[role]['role'])));
            ul.appendChild(li);
        }
    })
    .catch((error) => console.error(error));

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
    data.forEach(product => { 
        const article = document.createElement("article");
        article.setAttribute('data-id', product['soldierID']);
        article.classList.add("soldierPlaceholder");
        let div = document.createElement("div");
        div.classList.add("personalInfo");
        let li_soldierName = document.createElement("div");
        let li_role = document.createElement("div");
        let li_years = document.createElement("div");
        let soldierImg = document.createElement("img");
        soldierImg.src = `${product["s_img"]}`;
        soldierImg.alt = product["soldier name"];
        soldierImg.id = "soldierPic";
        li_soldierName.innerHTML = `<a href="soldierProfilePage.html?soldierId=${product['soldierID']}">${product["name"]}</a>`;
        li_role.innerHTML = `<a href="soldierProfilePage.html?soldierId=${product['soldierID']}">תפקיד:${product["role"]}</a>`;
        li_years.innerHTML= `<a href="soldierProfilePage.html?soldierId=${product['soldierID']}"> שנים ביחידה:${product["yearsInTheUnits"]}</a>`;
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
    getRoles();
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

