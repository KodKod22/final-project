window.onload = () => {    
    fetch("data/soldier.json")
        .then(Response => Response.json())
        .then(data =>{
            initialize(data)
            document.getElementById("sourceBar").addEventListener("input",searchSoldiers);
        });
        document.getElementById("category_bt").onclick = showFilers;

        document.getElementById("yearsInUnit").addEventListener("mouseover",function(event) {
            document.getElementById("submenu").style.display = "block";
            document.getElementById("submenu").onclick = quickSearch;
        });
        document.getElementById("yearsInUnit").addEventListener("mouseout", function(event) {
            document.getElementById("submenu").style.display = "none";
        });
        document.getElementById("submenu").addEventListener("li", function(event){
            
            quickSearch(event.target)
        });
        document.getElementById("backbutton").addEventListener("click",() => {
            history.back();
        });
}

function quickSearch(text) {
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    const value = "שנים ביחידה:" + text.target.textContent;    
    for(i = 0; i < article.length ;i++){
        let x = article[i].querySelectorAll("ul")[0];
        let y = x.children[2];
        let z = y.children[0].textContent.trim(); 
        if(z === value){   
            continue
        }else{
            article[i].style.display = "none";
        }
    }       
}
function showFilers() {
    const categoryMenu = document.getElementById("category_menu");
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
        let ul = document.createElement("ul");
        let li_soldierName = document.createElement("li");
        let li_role = document.createElement("li");
        let li_years = document.createElement("li");
        let soldierImg = document.createElement("img");
        soldierImg.src = `${product["location"]}`;
        soldierImg.alt = product["soldier name"];
        soldierImg.id = "soldierPic";
        li_soldierName.innerHTML = `<a href="Object.html?soldierId=${product.id}">${product["soldier name"]}</a>`;
        li_role.innerHTML = `<span>תפקיד: ${product["role"]}</span>`;
        li_years.innerHTML= `<span> שנים ביחידה:${product["years in the unit"]}</span>`;
        ul.appendChild(li_soldierName);
        ul.appendChild(li_role);
        ul.appendChild(li_years);
        article.appendChild(ul);
        article.appendChild(soldierImg);
        main.appendChild(article);
    });
    document.getElementById("category_menu").style.display = "none";
    document.getElementById("submenu").style.display = "none";
}

function searchSoldiers() {
    let inputField = document.getElementById("sourceBar");
    let value = inputField.value.toLowerCase();
    const main = document.getElementsByClassName("mainContainer")[0];
    let article = main.getElementsByTagName("article");
    console.log(value);
    if(inputField.value.trim()===""){
        for(i=0;i<article.length;i++){
            article[i].style.display="flex";
        }
    }
    
    for(i = 0; i < article.length ;i++){
        let x = article[i].querySelectorAll("ul")[0];
        let y = x.children[0];
        if(!y.innerHTML.includes(value)){
            article[i].style.display="none";
        }
    }
}


