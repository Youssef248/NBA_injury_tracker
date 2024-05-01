// app.js
document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const playerDataDiv = document.getElementById('playerData');

    playerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        if (firstName && lastName) {
            await fetchPlayerData(firstName, lastName);
        }
    });

    async function fetchPlayerData(firstName, lastName) {
        const response = await fetch('/playerData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName })
        });
        const data = await response.json();
        displayPlayerData(data);
    }

    function displayPlayerData(data) {
        let html = '';
        for (const year in data) {
            html += `<h2>${year}</h2>`;
            html += '<table>';
            html += '<tr><th>Date</th><th>Reason</th><th>Related Injury</th></tr>';
            data[year].allInactiveGames.forEach(game => {
                html += `<tr><td>${game.date}</td><td>${game.reason}</td><td>${game.relatedInjury}</td></tr>`;
            });
            html += '</table>';
        }
        playerDataDiv.innerHTML = html;
    }
});