# NBA Player Injury Data Scraper

Deze Node.js applicatie haalt NBA speler blessuregegevens op van [Fox Sports](https://www.foxsports.com/nba) en [Basketball Reference](https://www.basketball-reference.com/) websites. Het verzamelt gegevens over blessures en inactieve wedstrijden van een specifieke NBA-speler gedurende meerdere seizoenen.

## Functies

- Haalt NBA speler blessuregegevens op van de Fox Sports website.
- Scrapet inactieve wedstrijdgegevens voor een speler van de Basketball Reference website.
- Converteert datumformaten en vindt gerelateerde blessures voor elke inactieve wedstrijd.
- Verwerkt en organiseert de gegevens per jaar.
- Ondersteunt het ophalen van gegevens voor de jaren 2018 tot 2024.

## Dependencies

- [request-promise](https://www.npmjs.com/package/request-promise): Voor het maken van HTTP-verzoeken.
- [cheerio](https://www.npmjs.com/package/cheerio): Voor het parseren van HTML en het extraheren van gegevens.

## Installatie

1. Kloon de repository:

   ```bash
   gh repo clone Youssef248/NBA_injury_tracker
   ```

2. Installeer de dependencies:

   ```bash
   npm install
   ```

3. Start de applicatie:

   ```bash
   node server.js
   ```
   De server zal draaien op http://localhost:3000/

## Gebruik

1. Voer de voornaam en achternaam van de NBA-speler in waarvan je de blessuregegevens wilt ophalen. (Bijv: LeBron James)
2. Verzend het formulier.
3. De applicatie haalt en verwerkt de gegevens en toont deze in een tabel georganiseerd per jaar.

## Beperkingen

- De applicatie kan fouten tegenkomen als de structuur van de doelwebsites verandert.
- Snelheidsbeperkingen of toegangsbeperkingen die door de websites worden opgelegd, kunnen van invloed zijn op het ophalen van gegevens.

## Vereisten

In deze lijst vindt u waar bepaalde vereisten in de code te vinden zijn. Houd er rekening mee dat sommige vereisten meerdere keren voorkomen en daarom niet elk optreden in deze lijst is opgenomen.

### index.html

#### Formulier valideren:

  - HTML5 formulier validatie met de `required` attributen op de invoervelden `<input type="text" id="firstName" ... required>`

#### Basis CSS Animatie:

  - CSS animatie gedefinieerd in de stylesheet `@keyframes yearClickAnimation { ... }`

#### Gebruiken van een flexbox of CSS grid:

   - `display: flex; flex-direction: column; align-items: center; gap: 20px;`

### app.js

#### Elementen selecteren:

- `document.getElementById('playerForm')` selecteert het formulier.
- `document.getElementById('firstName')` en `document.getElementById('lastName')` selecteren de invoervelden.
- `document.getElementById('playerData')` selecteert de container voor de spelergegevens.
- `document.querySelectorAll('.year')` selecteert alle elementen met de class "year".

#### Elementen manipuleren:

- `playerDataDiv.innerHTML = html;` voegt de HTML voor de spelergegevens toe aan de container.
- `heading.classList.add('year-click-animation');` en `heading.classList.remove('year-click-animation');` voegen en verwijderen een CSS-animatieclass aan een element.

#### Event aan een element koppelen:

- `playerForm.addEventListener('submit', async (e) => { ... });` koppelt een submit event aan het formulier.
- `heading.addEventListener('click', () => { ... });` koppelt een click event aan de jaar koppen.

#### Gebruiken van een constante:

- `const playerForm`, `const firstNameInput`, `const lastNameInput`, `const playerDataDiv`, enz. definiëren constante variabelen.

#### Gebruiken van template literals:

- `displayPlayerData` gebruikt template literals. ``html += `<h2 class="year">${year}</h2>`;``

#### Iteration over een array:

- `data[year].allInactiveGames.forEach(game => { ... });` iterateert over een array van games.

#### Arrow function:

- `playerForm.addEventListener('submit', async (e) => { ... });` en `yearHeadings.forEach(heading => { ... });` gebruiken arrow functions.

#### Callback function:

- De functies die worden doorgegeven aan `addEventListener` zijn callback functies.

#### Promise:

- `const response = await fetch('/playerData', { ... });` in `fetchPlayerData` geeft een Promise.

#### Consumer methods:

- `.json()` method op de response (`const data = await response.json();`) consumeert de Promise.

#### Async & Await:

- `async function fetchPlayerData(firstName, lastName) { ... }` en het gebruik van `await` binnen deze functie.

#### Self executing function:

- `document.addEventListener('DOMContentLoaded', () => { ... });` functioneert als een self-executing function omdat de arrow function binnen de `DOMContentLoaded` event listener direct wordt uitgevoerd zodra het DOM volledig is geladen.

#### Fetch om data op te halen:

- `const response = await fetch('/playerData', { ... });` gebruikt `fetch` om data op te halen van de server.

#### JSON manipuleren en weergeven:

- `const data = await response.json();` haalt JSON data op.
- `displayPlayerData(data);` manipuleert en toont de JSON data.

#### Gebruik van LocalStorage:

- `localStorage.setItem('playerData', JSON.stringify(data));` slaat data op in LocalStorage.
- `const savedData = localStorage.getItem('playerData');` haalt data op uit LocalStorage.

### nbaInjuryScraper.js

#### Spread & Rest operator:

- `const [month, day, ...year] = dateStr.split('/');` in `nbaInjuryScraper.js` gebruikt de rest operator.

### server.js

#### Destructuring:

- `const { firstName, lastName } = req.body;` in `server.js` gebruikt destructuring om `firstName` en `lastName` uit `req.body` te halen.

## Bronnen
- Voor het ontwikkelen van deze app heb ik gebruik gemaakt van de [Web Advanced cursus](https://canvas.ehb.be/courses/33250/modules), de links van het [Extra lesmateriaal](https://canvas.ehb.be/courses/33250/pages/extra-lesmateriaal-zelfstudie?module_item_id=624677), de [Coding Along Video Series](https://www.youtube.com/playlist?list=PLGsnrfn8XzXhJUyCxjyvMmHDD-HbL2pDy) & de [Node JS Documentatie](https://nodejs.org/docs/latest/api/)

