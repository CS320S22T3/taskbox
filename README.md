# taskbox

A task tracking service for corporate use.

## Dependencies

- postgresql
- node.js

## Setup

Before attempting to set up a development environment, make sure you've installed the external dependencies listed
above. This repository is a monorepo for an Express backend and React frontend, located in `server/` and `client/`
respectively.

### Server

1) Navigate to the server folder
   ```bash
   cd server
   ```
2) Install npm dependencies
   ```bash
   npm install
   ```
4) Copy the example environment file
   ```bash
   cp .env.example .env
   ```
5) Fill in the environment file according to your system's needs
   ```bash
   ...
   # BEWARE THESE FIELDS ALMOST ALWAYS NEED TO BE CONFIGURED
   # COMMON VALUES INCLUDE "postgres" OR YOUR COMPUTER'S USER ACCOUNT NAME
   # ALONG WITH A BLANK PASSWORD VALUE
   DB_USERNAME=''
   DB_PASSWORD=''
   ... 
   ```
6) Create your development database
   ```bash
   npm run db:create
   npm run db:migrate
   npm run db:seed
   ```
7) Launch the server
   ```bash
   npm run start
   ```


### Client

1) In a separate terminal, navigate to the client folder
   ```bash
   cd client
   ```
2) Install npm dependencies
   ```bash
   npm install
   ```
3) Launch the client
   ```bash
   npm run start
   ```

[See the wiki](https://github.com/CS320S22T3/taskbox/wiki) for further development information.
