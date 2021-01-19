# Churchify-App
Churchify-App is a church management application built with React, Node, Express and Postgresql.

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
   Query: postgres -U postgres `chooseaname` < `file.sql`
   
   - `docs/countries.sql`
   - `docs/states.sql`
   - `docs/cities.sql`
   - `docs/zones.sql`
   - `docs/roles.sql`
   - `docs/permissions.sql`
   - `docs/configs.sql`
   - `docs/branches.sql`
   
6. Run "npm run start:dev" to start the app

8. Run "npm test" to test application


## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.

Babel: Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.  see [here](https://babeljs.io/docs/en/) for details.
