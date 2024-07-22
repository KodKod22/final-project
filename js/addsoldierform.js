document.addEventListener("DOMContentLoaded", ()=> {

    const navLinks = document.querySelectorAll('.navList a');
    const currentPage = window.location.pathname.split("/").pop();
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', () =>{
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });


    const FormHandler = {
        getFormData: ()=> {
            const soldierName = document.getElementById('soldierName').value;
            const personalNumber = document.getElementById('personalNumber').value;
            const role = document.getElementById('role').value;
            const rank = document.getElementById('rank').value;
            const rifleman = document.getElementById('rifleman').value;
            const birthdate = document.getElementById('birthday').value;
            const yearsInUnit = document.getElementById('yearsInUnit').value;
            const profilePicture = document.getElementById('profilePicture').files[0];
    
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

   
    const addSoldierForm = document.getElementById('addSoldierForm');
    
    if (addSoldierForm) {
        addSoldierForm.addEventListener('submit', (event) =>{
         
            const fileInput = document.getElementById('profilePicture');
            const file = fileInput.files[0];
            if (file && (file.size > 300 * 1024 || file.type !== 'image/png')) {
                event.preventDefault();
                console.error('הקובץ חייב להיות מסוג PNG ובגודל עד 300KB.');
                return;
            }
            
       
            event.preventDefault();
            FormHandler.getFormData();
        });
    }
});
