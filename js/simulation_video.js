document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');

    function toggleMenu() {
        sidebar.style.right = sidebar.style.right === '-250px' || sidebar.style.right === '' ? '0' : '-250px';
        overlay.style.display = sidebar.style.right === '0' ? 'block' : 'none';
    }

    function closeOverlay() {
        sidebar.style.right = '-250px';
        overlay.style.display = 'none';
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);

    const urlParams = new URLSearchParams(window.location.search);
    const missionId = urlParams.get('missionId');

 
    fetch(`/getTasks/${missionId}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('iframe').src = data.video;
        })
        .catch(error => console.error('Error loading simulation video:', error));
});
