document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const startBtn = document.querySelector('.start-btn');
    const breadcrumb = document.getElementById('breadcrumb');
    const taskDetails = document.getElementById('task-details');

    function toggleMenu() {
        sidebar.style.right = sidebar.style.right === '-250px' || sidebar.style.right === '' ? '0' : '-250px';
        overlay.style.display = sidebar.style.right === '0' ? 'block' : 'none';
    }

    function closeOverlay() {
        sidebar.style.right = '-250px';
        overlay.style.display = 'none';
    }

    function startSimulation() {
        const urlParams = new URLSearchParams(window.location.search);
        const missionId = urlParams.get('missionId');
        window.location.href = `simulation_video.html?missionId=${missionId}`;
    }

    function loadTaskDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const missionId = urlParams.get('missionId');

        fetch(`/getTasks/${missionId}`)
            .then(response => response.json())
            .then(task => {
                breadcrumb.textContent = `תיאור המשימה > ${task.simulationName}`;
                taskDetails.innerHTML = `
                    <h2>שם המשימה: ${task.simulationName}</h2>
                    <p>כלי התקוע: ${task.afvToRescue}</p>
                    <p>כלי מחלצים: ${task.RescueVehicle}</p>
                    <p>דרגת קושי: ${task.difficulty}</p>
                    <p>ניסיון: ${task.participants}</p>
                    <p>פירוט: תיאור המשימה כאן.</p>
                    <img src="${task.simulationPic}" alt="מפה">
                    <button class="start-btn">Start</button>
                `;
                startBtn.addEventListener('click', startSimulation);
            })
            .catch(error => console.error('Error loading task details:', error));
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);

    loadTaskDetails();
});
