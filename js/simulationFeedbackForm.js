document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.navList a');
    const currentPage = window.location.pathname.split("/").pop();
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const addSoldierForm = document.getElementById('feedback-form');
    
    if (addSoldierForm) {
        addSoldierForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const simulationName = document.getElementById('simulationName').value;
            const soldierName = document.getElementById('soldierName').value;
            const finalGrade = document.getElementById('finalGrade').value;
            const usingTools = document.getElementById('usingTools').value;
            const safety = document.getElementById('safety').value;
            const damageToTheAFV = document.getElementById('damageToTheAFV').value;
            const commanderFeedback = document.getElementById('commanderFeedback').value;

            let formData = {
                'simulationName': simulationName,
                'soldierName': soldierName,
                'finalGrade': finalGrade,
                'usingTools': usingTools,
                'safety': safety,
                'damageToTheAFV': damageToTheAFV,
                'commanderFeedback': commanderFeedback
            }
     
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(formData);

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
            };

            fetch("https://final-project-serverside.onrender.com/api/simulationFeedback/addSimulationFeedback", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        });
    }    
});
