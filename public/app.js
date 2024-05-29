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
        
        localStorage.setItem('playerData', JSON.stringify(data));
    }

    function displayPlayerData(data) {
        playerDataDiv.innerHTML = '';
    
        for (const year in data) {
            const yearHeading = document.createElement('h2');
            yearHeading.classList.add('year');
            yearHeading.textContent = year;
            const tableContainer = document.createElement('div');
            tableContainer.classList.add('table-responsive');
            const table = document.createElement('table');
            table.id = year;
            table.classList.add('table', 'table-bordered', 'table-striped', 'mb-4');
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Related Injury</th>
                </tr>
            `;
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            data[year].allInactiveGames.forEach(game => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${game.date}</td>
                    <td>${game.reason}</td>
                    <td>${game.relatedInjury}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            playerDataDiv.appendChild(yearHeading);
            playerDataDiv.appendChild(tableContainer);
        }
        addYearClickListeners();
    }
    

    function addYearClickListeners() {
        const yearHeadings = document.querySelectorAll('.year');
        yearHeadings.forEach(heading => {
            heading.addEventListener('click', () => {
                const year = heading.textContent;
                const table = document.getElementById(year);
                if (table.style.display === 'none') {
                    table.style.display = 'table';
                } else {
                    table.style.display = 'none';
                }
                heading.classList.add('year-click-animation');
                setTimeout(() => {
                    heading.classList.remove('year-click-animation');
                }, 300); 
            });
        });
    }

    
    const savedData = localStorage.getItem('playerData');
    if (savedData) {
        displayPlayerData(JSON.parse(savedData));
    }
});
