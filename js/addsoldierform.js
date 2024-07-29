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

    
    const addSoldierForm = document.getElementById('add-soldier-form');
    
    if (addSoldierForm) {
        addSoldierForm.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const fileInput = document.getElementById('s_img');
            const file = fileInput.files[0];
            if (file && (file.size > 300 * 1024 || file.type !== 'image/png')) {
                console.error('הקובץ חייב להיות מסוג PNG ובגודל עד 300KB.');
                return;
            }
            const soldierID = document.getElementById('soldierID').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const rank = document.getElementById('rank').value;
    const yearsInTheUnits = document.getElementById('yearsInTheUnits').value;
    const riflery = document.getElementById('riflery').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const s_img = document.getElementById('s_img').files[0];

            let formData = {
                'soldierID': soldierID,
                'name': name,
                'role': role,
                'rank': rank,
                'yearsInTheUnits': yearsInTheUnits,
                'riflery': riflery,
                'dateOfBirth': dateOfBirth
            }
            
            formData['s_img'] = 'ERR';


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(formData);

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
            };

            fetch("https://final-project-serverside.onrender.com/api/soldiers/addSoldier", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        });
    }    
});
