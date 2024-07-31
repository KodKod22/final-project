document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const breadcrumb = document.getElementById('breadcrumb');
    const tasks = document.querySelectorAll('.task');

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

    function navigateTo(page) {
        window.location.href = page;
    }

    function showTaskDetails(taskId) {
        navigateTo('task_details.html');
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);

    tasks.forEach(task => {
        task.addEventListener('click', function() {
            showTaskDetails(this.id);
        });
    });
});
