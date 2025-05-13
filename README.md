# AirBNC 

This is a portofolio project which recreates the function of the webpage AirBnB. 

# Environment setup

The projects makes use of packages "npm", "node-postgres", "dotenv" so these packages need to be installed before starting.
We will also use postgreSQL for working with our database
The packages can be installed with the following order and commands:

...sh
sudo apt update && sudo apt install postgresql
...

...sh
npm init -y
...

...sh
npm install pg
...

...sh
npm install dotenv
...

# Creating database 

In order to begin the project we need to create the database that we will use to seed and retrieve our information. We can create
our database in the control terminal with the following commands :

psql       //enables psql mode on control terminal 

CREATE DATABASE airbnc_test;

# Creating the connection with the 
