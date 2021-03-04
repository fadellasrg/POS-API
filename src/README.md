# Mugs Coffee
Mugs Coffee is a Point of Sales website that was built to make it easier for Cafe owners make transactions to buyers and also manage all the available menus.
This is the backend service for this app. You can see the frontend service [here](https://github.com/fadellasrg/POS-Web).

## Modules
1. [Bcrypt](https://www.npmjs.com/package/bcrypt)
2. [Body-parser](https://www.npmjs.com/package/body-parser)
3. [Cors](https://www.npmjs.com/package/cors)
4. [Dotenv](https://www.npmjs.com/package/dotenv)
5. [Express](https://www.npmjs.com/package/express)
6. [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
7. [Lodash](https://www.npmjs.com/package/lodash)
8. [Multer](https://www.npmjs.com/package/multer)
9. [Mysql2](https://www.npmjs.com/package/mysql2)
10. [Nodemon](https://www.npmjs.com/package/nodemon)
11. [Redis](https://redis.io/)

## How to use?
1. Clone this repository with `git clone https://github.com/fadellasrg/POS-API`.
2. Run `npm install` to install modules required.
3. Import database provided (db_pos.sql) to your SQL DBMS.
4. Set .env file in root:
    - `PORT` = fill to set the API running port.
    - `DB_HOST` = fill with HOSTNAME in your database configuration.
    - `DB_USER` = fill with USERNAME in your database configuration.
    - `DB_PASSWORD` = fill with PASSWORD in your database configuration (or leave it null if your database doesn't have password).
    - `JWT_SECRET` = fill with the unique value due to signature verifier on JWT.
5. Run `npm run start`

## Documentation
- [Postman](https://documenter.getpostman.com/view/13713483/TWDfDDVo)
- [Frontend](https://github.com/fadellasrg/POS-Web)