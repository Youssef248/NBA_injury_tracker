# NBA Player Injury Data Scraper

This Node.js application scrapes NBA player injury data from Fox Sports and Basketball Reference websites. It retrieves data about a specific NBA player's injuries and inactive games over multiple seasons.

## Features

- Fetches NBA player injury data from Fox Sports website.
- Scrapes inactive game data for a player from Basketball Reference website.
- Converts date formats and finds related injuries for each inactive game.
- Processes and organizes the data by year.
- Supports fetching data for the years 2018 to 2024.
- Provides error handling for processing failures.

## Dependencies

- [request-promise](https://www.npmjs.com/package/request-promise): For making HTTP requests.
- [cheerio](https://www.npmjs.com/package/cheerio): For parsing HTML and extracting data.

## Installation

1. Clone the repository:

   ```bash
   gh repo clone Youssef248/NBA_injury_tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   node server.js
   ```
   The server will be running on your http://localhost:3000/

## Usage

1. Enter the first name and last name of the NBA player you want to retrieve injury data for. (Ex: LeBron James)
2. Submit the form.
3. The application will fetch and process the data, displaying it in a table organized by year.

## Limitations

- The application may encounter errors if the structure of the target websites changes.
- Rate limiting or access restrictions imposed by the websites may affect data retrieval.

