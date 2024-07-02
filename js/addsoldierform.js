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

    document.getElementById('add-soldier-form').addEventListener('submit', function(event) {
        const fileInput = document.getElementById('profile-picture');
        const file = fileInput.files[0];
        if (file && (file.size > 300 * 1024 || file.type !== 'image/png')) {
            event.preventDefault();
            alert('הקובץ חייב להיות מסוג PNG ובגודל עד 300KB.');
        }
    });
});
