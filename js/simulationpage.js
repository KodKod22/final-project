document.addEventListener("DOMContentLoaded", function () {
    fetch('data/simulation.json')
        .then(response => response.json())
        .then(data => {
            const simulation = data.simulations[0];

            document.getElementById('simulation-title').textContent = simulation.title;
            document.getElementById('simulation-name').textContent = simulation.simulationName;
            document.getElementById('damage-tool').textContent = simulation.damageTool;
            document.getElementById('rescue-tools').textContent = simulation.rescueTools;
            document.getElementById('location').textContent = simulation.location;
            document.getElementById('participants').textContent = simulation.participants;
            document.getElementById('driver').textContent = simulation.driver;
            document.getElementById('team-members').textContent = simulation.teamMembers;
            document.getElementById('commander').textContent = simulation.commander;
            document.getElementById('safety-officer').textContent = simulation.safetyOfficer;
            document.getElementById('difficulty').textContent = simulation.difficulty;
            document.getElementById('date').textContent = simulation.date;
            document.getElementById('simulation-video').src = simulation.video;
        })
        .catch(error => console.error('Error fetching the simulation data:', error));
});
