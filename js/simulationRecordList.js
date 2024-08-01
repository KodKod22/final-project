window.onload = () => {    
    fetch("https://final-project-serverside.onrender.com/api/soldiers/getSoldiers")
        .then(Response => Response.json())
        .then(data =>{
                initialize(data)
                document.getElementById("sourceBar").addEventListener("input",searchSoldiers);
        })
        .catch(error => console.error('Error fetching data:', error));

        document.getElementById("categoryButton").onclick = showFilers;
        document.getElementById("difficulty").addEventListener("mouseover",(event) =>{
            document.getElementById("submenu").style.display = "block";
            document.getElementById("submenu").onclick = quickSearch;
        });

        document.getElementById("difficulty").addEventListener("mouseout",(event) =>{
            document.getElementById("submenu").style.display = "none";
        });
        document.getElementById("afv").addEventListener("mouseover",(event) =>{
            document.getElementById("submenuAFV").style.display = "block";
        });

        document.getElementById("afv").addEventListener("mouseout",(event) =>{
            document.getElementById("submenuAFV").style.display = "none";
        });
        document.getElementById("submenu").addEventListener("click", (event) =>{ 
            quickSearch(event.target);
        });
        document.getElementById("submenuAFV").addEventListener("click", (event) =>{
            unitSearch(event.target.innerText);
        });
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
        article.setAttribute('data-id', product['id']);
        article.classList.add("simulationRecordPlaceholder");
        let div = document.createElement("div");
        div.classList.add("recordInfo");
        
    });
    document.getElementById("categoryMenu").style.display = "none";
    document.getElementById("submenu").style.display = "none";
}
