document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const startBtn = document.querySelector('.start-btn');
    const breadcrumb = document.getElementById('breadcrumb');
    const taskDetails = document.getElementById('task-details');

    function toggleMenu() {
        if (sidebar.style.right === '-250px' || sidebar.style.right === '') {
            sidebar.style.right = '0';
            overlay.style.display = 'block';
        } else {
            sidebar.style.right = '-250px';
            overlay.style.display = 'none';
        }
    }

    function closeOverlay() {
        sidebar.style.right = '-250px';
        overlay.style.display = 'none';
    }

    function startSimulation() {
        window.location.href = 'simulation_video.html';
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);
    startBtn.addEventListener('click', startSimulation);
});
