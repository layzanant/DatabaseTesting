# Awesome Project Build with TypeORM

Steps to run this project:

1. Setup database settings inside `src/data-source.ts` file as per your database host,port, db credentails
2. To bring the postgres docker up run the command `docker compose up -d`
3. Run `npm install` command to install all the dependencies
4. Run `npm start` command

To Run the Unit and Integration Test:-
a) npm run test

<!-- #with coverage -->

b)npm run test-coverage

To run the Migration:-
a) To Run Migration changes:-
npm run migration-run

b) To Revert the Migration changes:-
npm run migration-revert
