document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.navList a');
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }

        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const FormHandler = {
        getFormData: () => {
            const soldierName = document.getElementById('soldierName').value;
            const personalNumber = document.getElementById('personalNumber').value;
            const role = document.getElementById('role').value;
            const rank = document.getElementById('rank').value;
            const rifleman = document.getElementById('rifleman').value;
            const birthdate = document.getElementById('birthdate').value;
            const yearsInUnit = document.getElementById('yearsInUnit').value;
            const profilePicture = document.getElementById('profilePicture').files[0];

            const formData = new FormData();
            formData.append('soldierName', soldierName);
            formData.append('personalNumber', personalNumber);
            formData.append('role', role);
            formData.append('rank', rank);
            formData.append('rifleman', rifleman);
            formData.append('birthdate', birthdate);
            formData.append('yearsInUnit', yearsInUnit);
            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            return formData;
        }
    };

    const addSoldierForm = document.getElementById('add-soldier-form');

    if (addSoldierForm) {
        addSoldierForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fileInput = document.getElementById('profilePicture');
            const file = fileInput.files[0];
            if (file && (file.size > 300 * 1024 || file.type !== 'image/png')) {
                console.error('הקובץ חייב להיות מסוג PNG ובגודל עד 300KB.');
                return;
            }

            const formData = FormHandler.getFormData();

            try {
                const response = await fetch('/api/soldiers', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    console.log('Soldier added successfully');
                   
                } else {
                    console.error('Failed to add soldier');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
