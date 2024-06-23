window.onload = () => {
    
    fetch("data/soldier.json")
        .then(Response => Response.json())
        .then(data => initialize(data));
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
        li_soldierName.innerHTML = `<span>שם: ${product["soldier name"]}</span>`;
        li_role.innerHTML = `<span>תפקיד: ${product["role"]}</span>`;
        li_years.innerHTML= `<span> שנים ביחידה:${product["years in the unit"]}</span>`;

        
        ul.appendChild(li_soldierName);
        ul.appendChild(li_role);
        ul.appendChild(li_years);
        article.appendChild(ul);
        article.appendChild(soldierImg);
        main.appendChild(article);
    });
    
}