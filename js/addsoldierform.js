document.addEventListener("DOMContentLoaded", function() {

    const navLinks = document.querySelectorAll('.nav_list a');
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
        getFormData: function() {
            const soldierName = document.getElementById('soldier-name').value;
            const personalNumber = document.getElementById('personal-number').value;
            const role = document.getElementById('role').value;
            const rank = document.getElementById('rank').value;
            const rifleman = document.getElementById('rifleman').value;
            const birthdate = document.getElementById('birthdate').value;
            const yearsInUnit = document.getElementById('years-in-unit').value;
            const profilePicture = document.getElementById('profile-picture').files[0];
    
            const formData = {
                soldierName: soldierName,
                personalNumber: personalNumber,
                role: role,
                rank: rank,
                rifleman: rifleman,
                birthdate: birthdate,
                yearsInUnit: yearsInUnit,
                profilePicture: profilePicture ? profilePicture.name : "No file uploaded"
            };
            
            const requestJson = JSON.stringify(formData);
            console.log('Form data:', requestJson);
        }
    };

   
    const addSoldierForm = document.getElementById('add-soldier-form');
    
    if (addSoldierForm) {
        addSoldierForm.addEventListener('submit', function(event) {
         
            const fileInput = document.getElementById('profile-picture');
            const file = fileInput.files[0];
            if (file && (file.size > 300 * 1024 || file.type !== 'image/png')) {
                event.preventDefault();
                alert('הקובץ חייב להיות מסוג PNG ובגודל עד 300KB.');
                return;
            }
            
       
            event.preventDefault();
            FormHandler.getFormData();
        });
    }
});
