# Churchify-App
Churchify-App is a church management application built with React, Node, Express and Postgresql. This repository is the api web service for the application.

[![Build Status](https://travis-ci.org/GerrardE/churchify-app-backend.svg?branch=develop)](https://travis-ci.org/GerrardE/churchify-app-backend) [![Coverage Status](https://coveralls.io/repos/github/GerrardE/churchify-app-backend/badge.svg?branch=develop)](https://coveralls.io/github/GerrardE/churchify-app-backend?branch=develop) [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com) 

**_This App is Live at_** ____

## Features
Below are the features of churchify-app-backend at this point

###
- Users can be able to hit an api endpoint and register <br>
- Users can be able to hit an api endpoint and login <br>
- Users can be able to hit an api endpoint and retrieve dashboard statistics <br>
- Users can be able to hit an api endpoint and retrieve downloads <br>
- Users with permissions can be able to hit an api endpoint and submit reports <br>
- Users with permissions can be able to hit an api endpoint and generate reports <br>
- Users with permissions can be able to hit an api endpoint and create a user <br>
- Users with permissions can be able to hit an api endpoint and CRUD users <br>
- Users with permissions can be able to hit an api endpoint and CRUD roles <br>
- Users with permissions can be able to hit an api endpoint and CRUD permissions <br>
- Users with permissions can be able to hit an api endpoint and CRUD zones <br>
- Users with permissions can be able to hit an api endpoint and CRUD branches <br>
- Users with permissions can be able to hit an api endpoint and CRUD preachers <br>
- Users with permissions can be able to hit an api endpoint and CRUD fellowships <br>
- Users with permissions can be able to hit an api endpoint and CRUD events <br>
- Users with permissions can be able to hit an api endpoint and CRUD categories <br>
- Users with permissions can be able to hit an api endpoint and CRUD downloads <br>

## Installation
1. Clone this repository below:
```
https://github.com/GerrardE/churchify-app-backend.git
```
2. cd into the repository:
```
cd churchify-app-backend
```
3. Open the repository in terminal and Install dependencies by running:
```
npm install
```
4. Create a postgres database `chooseaname` and update `.env` file accordingly.
5. Run database setup in this order:
   Query: psql -U postgres `chooseaname` < `file.sql`
   
   - `docs/database/countries.sql`
   - `docs/database/states.sql`
   - `docs/database/cities.sql`
   - `docs/database/zones.sql`
   - `docs/database/roles.sql`
   - `docs/database/userroles.sql`
   - `docs/database/permissions.sql`
   - `docs/database/configs.sql`
   - `docs/database/branches.sql`

6. Setup your `.env` using the `.env.example` format

7. Run `npm run seed` to setup the `super:admin` with login credentials from the `.env`

8. Run "npm run start:dev" to start the app

9. Run "npm test" to test application

## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for more details.

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for more details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for more details.

Babel: Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.  see [here](https://babeljs.io/docs/database/en/) for more details.

Postgres: PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. see [here](https://www.postgresql.org/) for more details.