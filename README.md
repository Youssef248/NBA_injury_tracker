# NBA Player Injury Data Scraper

This Node.js application retrieves NBA player injury data from the [Fox Sports](https://www.foxsports.com/nba) and [Basketball Reference](https://www.basketball-reference.com/) websites. It collects information about injuries and inactive games for a specific NBA player across multiple seasons.

## Features

* Retrieves NBA player injury data from the Fox Sports website.
* Scrapes inactive game data for a player from the Basketball Reference website.
* Converts date formats and finds related injuries for each inactive game.
* Processes and organizes the data by year.
* Supports retrieving data for the years 2018 to 2024.

## Dependencies

* [request-promise](https://www.npmjs.com/package/request-promise): Used for making HTTP requests.
* [cheerio](https://www.npmjs.com/package/cheerio): Used for parsing HTML and extracting data.

## Installation

1. Clone the repository:

   ```bash
   gh repo clone Youssef248/NBA_injury_tracker
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   node server.js
   ```

   The server will run at http://localhost:3000/

## Usage

1. Enter the first name and last name of the NBA player whose injury data you want to retrieve. (Example: LeBron James)
2. Submit the form.
3. The application retrieves and processes the data and displays it in a table organized by year.

## Limitations

* The application may encounter errors if the structure of the target websites changes.
* Rate limits or access restrictions imposed by the websites may affect data retrieval.

## Requirements

This list shows where certain requirements can be found in the code. Please note that some requirements occur multiple times and therefore not every occurrence is included in this list.

### index.html

#### Form validation:

* HTML5 form validation using the `required` attributes on the input fields `<input type="text" id="firstName" ... required>`

#### Basic CSS animation:

* CSS animation defined in the stylesheet `@keyframes yearClickAnimation { ... }`

#### Using Flexbox or CSS Grid:

* `display: flex; flex-direction: column; align-items: center; gap: 20px;`

### app.js

#### Selecting elements:

* `document.getElementById('playerForm')` selects the form.
* `document.getElementById('firstName')` and `document.getElementById('lastName')` select the input fields.
* `document.getElementById('playerData')` selects the container for the player data.
* `document.querySelectorAll('.year')` selects all elements with the class `"year"`.

#### Manipulating elements:

* `playerDataDiv.innerHTML = html;` adds the HTML for the player data to the container.
* `heading.classList.add('year-click-animation');` and `heading.classList.remove('year-click-animation');` add and remove a CSS animation class from an element.

#### Attaching an event to an element:

* `playerForm.addEventListener('submit', async (e) => { ... });` attaches a submit event to the form.
* `heading.addEventListener('click', () => { ... });` attaches a click event to the year headings.

#### Using a constant:

* `const playerForm`, `const firstNameInput`, `const lastNameInput`, `const playerDataDiv`, etc. define constant variables.

#### Using template literals:

* `displayPlayerData` uses template literals. ``html += `<h2 class="year">${year}</h2>`;``

#### Iterating over an array:

* `data[year].allInactiveGames.forEach(game => { ... });` iterates over an array of games.

#### Arrow function:

* `playerForm.addEventListener('submit', async (e) => { ... });` and `yearHeadings.forEach(heading => { ... });` use arrow functions.

#### Callback function:

* The functions passed to `addEventListener` are callback functions.

#### Promise:

* `const response = await fetch('/playerData', { ... });` in `fetchPlayerData` returns a Promise.

#### Consumer methods:

* The `.json()` method on the response (`const data = await response.json();`) consumes the Promise.

#### Async & Await:

* `async function fetchPlayerData(firstName, lastName) { ... }` and the use of `await` inside this function.

#### Self-executing function:

* `document.addEventListener('DOMContentLoaded', () => { ... });` functions as a self-executing function because the arrow function inside the `DOMContentLoaded` event listener is executed immediately once the DOM has fully loaded.

#### Using Fetch to retrieve data:

* `const response = await fetch('/playerData', { ... });` uses `fetch` to retrieve data from the server.

#### Manipulating and displaying JSON:

* `const data = await response.json();` retrieves JSON data.
* `displayPlayerData(data);` manipulates and displays the JSON data.

#### Using LocalStorage:

* `localStorage.setItem('playerData', JSON.stringify(data));` stores data in LocalStorage.
* `const savedData = localStorage.getItem('playerData');` retrieves data from LocalStorage.

### nbaInjuryScraper.js

#### Spread & Rest operator:

* `const [month, day, ...year] = dateStr.split('/');` in `nbaInjuryScraper.js` uses the rest operator.

### server.js

#### Destructuring:

* `const { firstName, lastName } = req.body;` in `server.js` uses destructuring to extract `firstName` and `lastName` from `req.body`.

## Sources

* While developing this app, I used the [Web Advanced course](https://canvas.ehb.be/courses/33250/modules), the links from the [Additional Course Material](https://canvas.ehb.be/courses/33250/pages/extra-lesmateriaal-zelfstudie?module_item_id=624677), the [Coding Along Video Series](https://www.youtube.com/playlist?list=PLGsnrfn8XzXhJUyCxjyvMmHDD-HbL2pDy), and the [Node.js Documentation](https://nodejs.org/docs/latest/api/).
