# TaskBox

A shared task board designed for workplaces.

## Getting Started

### Shared

- Open the root directory.
- Make sure you have a newer version of node installed.
- Some of the packages that we are using require a newer runtime.
  - This also makes sure we have a consistent `package-lock.json` . Older versions of npm had a different format.
  - If you need assistance there are `./install_node.sh`  and `./post_install_node.sh` scripts available.

### Client

- Open the client folder, `cd client` and `npm install`.
- Wait for client packages to download.
- Run `npm start` to launch a local watch server.
- The local watch server will deploy the client application, open your default browser, and redeploy anytime you make a file change.
- If your default browser is not opened, just open it on your own and to go to `localhost:3000`.

### Server

- Make sure you have your Postgres development server initialized.
- If not there is a `init_database.sh` script. Usage: `./init_database.sh daniel` This will create a new super user named daniel and a new postgres database called taskbox .
- Run `cp ./server/.env.local.example ./server/.env`
- Fill in the the .env file with the necessary items: denoted by `<item>`, such as the database user, password, host, and port (usually 5432). If your development database is not named taskbox then change it in the `.env` file as well.
- Open the server folder `cd server` and `npm install`.
- Wait for server packages to download.
- `npm start`

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
