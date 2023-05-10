# Quan ly hien mau tinh nguyen tai Thanh Pho Da Nang

### Tech

* [node.js]
* [Express]
* [mysql2]
* [bcryptjs]
* [jsonwebtoken]
* [express-validator]
* [dotenv]
* [cors]
* [swagger]

### Getting Started

``` sh
# Clone this repo to your local machine using
git clone git@github.com/darkdy11235/quan_ly_hien_mau

# Get into the directory
cd mysql-node-express

# Make it your own
rm -rf .git && git init

# Coppy .env-example and create your own .env file
cp .env-example .env

# Edit .env file and add your mysql username, mysql password and db name
vi .env
# you can edit the file also via text editor

# Get into the db directory
cd src/db

# Import mysql database using Command line
mysql -u [db_username] -p[db_password] < create-user-db.sql
# you can edit the file if you want to change the db_name
# if you are using a different db_name and it elready exists,
# you can comment the first two lines, remain the line
# and just change the db_name

# Install dependencies
npm install

# Run the server locally
npm start

# Run the server locally in dev mode
npm run dev

# You can see the api docs at
http://localhost:8000/api-docs
# Change the port in .env file if you want to use a different port
```

**Welcome To HELL :))**