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

    const FormHandler = {
        getFormData: () => {
            const soldierID = document.getElementById('soldierID').value;
            const name = document.getElementById('name').value;
            const role = document.getElementById('role').value;
            const rank = document.getElementById('rank').value;
            const yearsInTheUnits = document.getElementById('yearsInTheUnits').value;
            const riflery = document.getElementById('riflery').value;
            const dateOfBirth = document.getElementById('dateOfBirth').value;
            const s_img = document.getElementById('s_img').files[0];
    
            const formData = new FormData();
            formData.append('soldierID', soldierID);
            formData.append('name', name);
            formData.append('role', role);
            formData.append('rank', rank);
            formData.append('yearsInTheUnits', yearsInTheUnits);
            formData.append('riflery', riflery);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('s_img', s_img);
    
            return formData;
        }
    };

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

            const formData = FormHandler.getFormData();

            try {
                const response = await fetch('https://final-project-serverside.onrender.com/api/soldiers/addSoldier', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Success:', result);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
