# TaskBox

A shared task board designed for workplaces.

## Requirements

- Node.js & npm
- Postgresql

## Getting Started

### Client

- Open the client folder, `cd client` and `npm install`.
- Wait for client packages to download.
- Run `npm start` to launch a local watch server.
- The local watch server will deploy the client application, open your default browser, and redeploy anytime you make a file change.
- If your default browser is not opened, just open it on your own and to go to `localhost:3000`.

### Server

- Enter the server folder `cd server`.
- Run `cp .env.example .env` and fill out respected fields.
- Install necessary packages `npm install`
- Make sure you have your Postgres development database initialized.
  - If not there is a `npm run db:create` to create a db and `npm run db:drop` to drop a db.
- Migrate the schemas into the database `npm run db:migrate`
- Seed the database with stub data `npm run db:seed`
- Start listening for queries `npm start`

## Debugging

- There are two template debug configurations in `.vscode/launch.example.json`.
- To import them do `cp ./.vscode/launch.example.json ./.vscode/launch.json`

### Debugging Client

- First set your breakpoint or debugger statements.
- Then run `npm start` and open the web app in chrome.
- Then use the `Launch chrome against localhost` config.
- Your VSCode will then be able to debug the web app.

### Debugging Server

- Set breakpoints or use debugger statements.
- Run the `Launch Server`..
