const get = require('request-promise');
const cheerio = require('cheerio');

// Function to convert date format to YYYY-MM-DD
function formatDate(dateStr) {
    let [month, day, year] = dateStr.split('/');
    year = '20' + year; // Assuming year is in two digits and 2000s
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Function to fetch injury data
async function fetchInjuryData(firstName, lastName) {
    const injuriesUrl = `https://www.foxsports.com/nba/${firstName.toLowerCase()}-${lastName.toLowerCase()}-player-injuries`;
    console.log('Fetching data from:', injuriesUrl);
    let body = await get(injuriesUrl);
    let $ = cheerio.load(body);
    let injuries = [];

    $('tbody tr').each(function() {
        let date = $(this).find('td:nth-child(1)').text().trim();
        let injury = $(this).find('td:nth-child(2)').text().trim();
        date = formatDate(date); // Convert the date to YYYY-MM-DD format
        injuries.push({ date: date, injury: injury });
    });

    return injuries;
}

// Function to find related injury
function findRelatedInjury(injuryData, gameDate) {
    let relatedInjury = "Unknown";
    for (let injury of injuryData) {
        let injuryDate = new Date(injury.date);
        if (injuryDate <= gameDate) {
            relatedInjury = injury.injury;
            break;
        }
    }
    return relatedInjury;
}

// Function to process inactive games data by year
async function processInactiveGames(injuryData, firstName, lastName, year) {
    const firstLetter = lastName.substring(0,1).toLowerCase();
    const gameLogUrl = `https://www.basketball-reference.com/players/${firstLetter}/${lastName.substring(0,5).toLowerCase()}${firstName.substring(0,2).toLowerCase()}01/gamelog/${year}`;
    let body = await get(gameLogUrl);
    let $ = cheerio.load(body);
    let allInactiveGames = [];
    let injurySummary = {};

    $('tr').each((index, element) => {
        const reason = $(element).find('td[data-stat="reason"]').text();
        if (reason) {
            let date = $(element).find('td[data-stat="date_game"]').text();
            let gameDate = new Date(date);
            let relatedInjury = findRelatedInjury(injuryData, gameDate);

            if (relatedInjury !== "Unknown") {
                injurySummary[relatedInjury] = (injurySummary[relatedInjury] || 0) + 1;
            }

            allInactiveGames.push({ date: date, reason: reason, relatedInjury: relatedInjury });
        }
    });

    return {
        allInactiveGames,
        injurySummary
    };
}

async function processPlayerData(firstName, lastName) {
    try {
        let injuryData = await fetchInjuryData(firstName, lastName);
        let playerData = {};
        
        for (let year = 2018; year <= 2024; year++) {
            let { allInactiveGames, injurySummary } = await processInactiveGames(injuryData, firstName, lastName, year);
            playerData[year] = { allInactiveGames, injurySummary };
        }

        return playerData;
    } catch (err) {
        throw new Error(`Error during processing: ${err}`);
    }
}

module.exports = {
    processPlayerData
};
