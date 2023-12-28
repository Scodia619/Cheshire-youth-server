Youth Commission API - Back End

This is a RESTful API which provides data from the Youth Commission database. The database is PSQL, interacted with via prisma. It contains data on reports, commissions, topics, users, which are accessible via the endpoints provided and appropriate GET, POST and DELETE methods.

Hosted version

The hosted version of the API can be found here: https://cheshire-youth-server.onrender.com

A link the the github repository can be found here: https://github.com/Scodia619/Cheshire-youth-server

Prerequisites

Please ensure the following are installed:

    Node: v14.16.0
    node package manager: v7.24.0

Getting Started

To set up your own repository, please follow the instructions below

    Copy the code and paste into your terminal, in the usual directory for your projects

    git clone https://github.com/Scodia619/Cheshire-youth-server

Once it has been successfully cloned, type the following code and press enter, in order to access the directory.

cd Cheshire-youth-server

    From here, you can open the directory in your source-code editor of choice e.g. visual-studio, atom etc.


    Once in your editor, the dependencies to run the project can be installed using npm package manager.

    In your terminal, type the code below to install the packages need to run the project

    npm install


The following dependencies should have been installed:

    @prisma/client
    cors
    express
    jest,
    password-hash
    path
    prisma
    supertest

    Create a .env files in order to link to the development and test databases These files should be called:

    .env

    Inside each file add:  DATABASE_URL='database-link'

    Create the databases by running the following command in your terminal:

    $ npx prisma db push

If an error occurs, please ensure your have named/set up the .env files as stated, and that they are in the root level of your directory

    The development database can then be seeded by running the following command in the terminal:

    $ npm run seed

    To run the server locally, type the code below into your terminal. The terminal should confirm that it has started listening

    $ npm listen

Testing

The tests created can be found in the: __tests__/server.test.js directory

To run the testing suite, type the code below in your terminal

    npm run test

Please ensure you have the testing dependencies listed above installed, in order to ensure the tests complete successfully.

This should seed the tests database, with the test data, before each test.

The terminal should confirm that this is happening