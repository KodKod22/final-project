document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const breadcrumb = document.getElementById('breadcrumb');
    const tasksContainer = document.querySelector('.tasks-container');

    function toggleMenu() {
        sidebar.style.right = sidebar.style.right === '-250px' || sidebar.style.right === '' ? '0' : '-250px';
        overlay.style.display = sidebar.style.right === '0' ? 'block' : 'none';
    }

    function closeOverlay() {
        sidebar.style.right = '-250px';
        overlay.style.display = 'none';
    }

    function navigateTo(page) {
        window.location.href = page;
    }

    function showTaskDetails(task) {
        const taskDetails = document.getElementById(`${task.missionId}-details`);
        const isVisible = taskDetails.style.display === 'block';
        document.querySelectorAll('.task-details').forEach(detail => detail.style.display = 'none');
        taskDetails.style.display = isVisible ? 'none' : 'block';
    }

    function loadTasks() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (!userData || !userData.id) {
            console.error('No user data found in sessionStorage.');
            return;
        }

        fetch(`/getTasks/${userData.id}`)
            .then(response => response.json())
            .then(tasks => {
                tasksContainer.innerHTML = '';
                tasks.forEach(task => {
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('task');
                    taskElement.id = `task${task.missionId}`;

                    const img = document.createElement('img');
                    img.src = task.simulationPic;
                    img.alt = task.simulationName;

                    const taskName = document.createElement('div');
                    taskName.classList.add('task-name');
                    taskName.textContent = task.simulationName;

                    const infoIcon = document.createElement('i');
                    infoIcon.classList.add('fas', 'fa-info-circle');

                    taskElement.appendChild(img);
                    taskElement.appendChild(taskName);
                    taskElement.appendChild(infoIcon);

                    tasksContainer.appendChild(taskElement);

                    taskElement.addEventListener('click', function () {
                        showTaskDetails(task);
                        navigateTo(`task_details.html?missionId=${task.missionId}`);
                    });

                    const taskDetails = document.createElement('div');
                    taskDetails.classList.add('task-details');
                    taskDetails.id = `${task.missionId}-details`;
                    taskDetails.style.display = 'none';
                    taskDetails.innerHTML = `
                        <h2>Task: ${task.simulationName}</h2>
                        <p>Location: ${task.location}</p>
                        <p>Difficulty: ${task.difficulty}</p>
                        <p>Rescue Vehicle: ${task.RescueVehicle}</p>
                        <p>Participants: ${task.participants}</p>
                    `;
                    tasksContainer.appendChild(taskDetails);
                });
            })
            .catch(error => console.error('Error loading tasks:', error));
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);

    loadTasks();
});
