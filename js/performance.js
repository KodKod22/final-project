document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const breadcrumb = document.getElementById('breadcrumb');
    const simulations = document.querySelectorAll('.simulation');

    function toggleMenu() {
        sidebar.style.right = sidebar.style.right === '-250px' || !sidebar.style.right ? '0' : '-250px';
        overlay.style.display = sidebar.style.right === '0' ? 'block' : 'none';
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

    function loadPerformanceData() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log('User data loaded from sessionStorage:', userData);

        if (!userData || !userData.id) {
            console.error('No user data found in sessionStorage.');
            return;
        }

        console.log('Fetching performance data for soldier ID:', userData.id);

        fetch('/getFeedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ soldierID: userData.id })
        })
        .then(response => {
            console.log('HTTP response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Performance data received:', data);

            if (data.length > 0) {
                data.forEach((simulation, index) => {
                    const simulationElement = document.getElementById(`sim${index + 1}-details`);
                    if (simulationElement) {
                        const usingToolsElement = simulationElement.querySelector('.circle.green');
                        const safetyElement = simulationElement.querySelectorAll('.circle.red')[0];
                        const damageElement = simulationElement.querySelectorAll('.circle.red')[1];
                        const feedbackElement = simulationElement.querySelector('.feedback');

                        usingToolsElement.textContent = `${simulation.usingTools}%`;
                        safetyElement.textContent = `${simulation.safety}%`;
                        damageElement.textContent = `${simulation.damageToTheAFV}%`;
                        feedbackElement.textContent = `הערכת מפקד: ${simulation.commanderFeedback}`;
                    }
                });
            } else {
                console.error('No performance data found for this soldier.');
            }
        })
        .catch(error => console.error('Error fetching performance data:', error));
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeOverlay);

    simulations.forEach(simulation => {
        simulation.addEventListener('click', function() {
            showSimulationDetails(this.id);
        });
    });

    loadPerformanceData();
});
