### How to run this code?
1. Clone this repository
2. Open the terminal and go to the directory where you cloned the repository
3. In the backend rename .env_back to .env
4. Create a database in Mysql with the same name as MYSQL_DATABASE in .env
5. In the terminal run the following commands:
```
npm install
```
6. Go to the backend folder and Go inside models folder and then index file line 22
7. UnComment the // sequelize.sync();
8. Go to the backend folder and run the following command:
```
node index.js
```
9. This will create the tables in the database
10. Go to the backend folder and Go inside models folder and then index file line 22
11. Comment out the // sequelize.sync();
12. Go to the backend folder and run the following command:
```
node index.js
```
13. This will start the backend server
14. Go to the frontend folder and rename the .env.local_back to .env.local
15. Go to the frontend folder and run the following command:
```
npm install
npm start
```
16. This will start the frontend server
17. To add books post on the following endpoint:
```
/books
```
