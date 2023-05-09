# News Backend API

## Background
This news backend API mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

## Development
This API uses Postgresql as the database server and seeding functions will populate this database with our sample data.

Seeding functions expect .env.development for development database and .env.test for testing database in the root folder.

The .env files should provide the name of databases with PGDATABASE variable in this format.
PGDATABASE=nc_news --for development

and for testing environment
PGDATABASE=nc_news_test --for testing

## Cloning
To develop this project locally, please fork it first and clone in your local machine
git clone https://github.com/baloglu/News-Backend.git <local_project_name>

## Branching

Before making any changes, branch off from the main branch
git checkout -b <branch_name>

after pushing your changes, you can make a pull request for us to review changes
