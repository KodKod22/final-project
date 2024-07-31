document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const breadcrumb = document.getElementById('breadcrumb');
    const simulations = document.querySelectorAll('.simulation');

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

    function showSimulationDetails(simulationId) {
        const allDetails = document.querySelectorAll('.simulation-details');

        allDetails.forEach(detail => {
            if (detail.id !== `${simulationId}-details`) {
                detail.style.display = 'none';
            }
        });

        const details = document.getElementById(`${simulationId}-details`);
        if (details.style.display === 'block') {
            details.style.display = 'none';
            updateBreadcrumb('ביצועים שלי');
        } else {
            details.style.display = 'block';
            const simulationName = document.querySelector(`#${simulationId} .simulation-name`).textContent;
            updateBreadcrumb(`ביצועים שלי > ${simulationName}`);
        }
    }

    function updateBreadcrumb(text) {
        breadcrumb.textContent = text;
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);

    simulations.forEach(simulation => {
        simulation.addEventListener('click', function() {
            showSimulationDetails(this.id);
        });
    });
});
