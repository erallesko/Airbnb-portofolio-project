# AirBNC 

This is a portofolio project which recreates the function of the webpage AirBnB. 

# Environment setup

The projects makes use of packages "npm", "node-postgres", "dotenv" so these packages need to be installed before starting.
We will also use postgreSQL for working with our database
The packages can be installed with the following order and commands:

sudo apt update && sudo apt install postgresql

npm init -y

npm install pg

npm install dotenv

# Creating database 

In order to begin the project we need to create the database that we will use to seed and retrieve our information. We can create
our database in the control terminal with the following commands :

psql       //enables psql mode on control terminal 

CREATE DATABASE airbnc_test;

# Creating database connection

In order to connect to our database with node-pg, we will create a connection.js file.
We will then require pg from the system with the following command:

const {Pool} = require("pg");

Once we've done that, we're creating a new instance of pool requests and exporting it:

const pool = new Pool();

module.exports = pool; 

In order to keep the database private we will save it in a dotenv file (.env) with the following command inside:

PGDATABASE=airbnc_test

and then require the dotenv file into our connection with :

require("dotenv").config();






