# Making the docker container for MySQL

```bash
docker pull mysql
```

```bash
docker run -dit --name MySQL -e MYSQL_ROOT_PASSWORD=root -v /local/path/for/database/data:/var/lib/mysql -p 3306:3306 mysql
```

In MySQL, run ```ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root'```

## Making Climbers table

the `createdAt` and `updatedAt` fields are automaticalluy used by Sequelize.

```SQL
CREATE TABLE Climbers(
    id INT PRIMARY KEY,
    name VARCHAR(255),
    height INT,
    age INT,
    hometown VARCHAR(255),
    isMale BOOLEAN,
    createdAt DATETIME,
    updatedAt DATETIME
);
```

```SQL
CREATE TABLE Events(
    id INT PRIMARY KEY,
    location VARCHAR(255),
    eventTime VARCHAR(255),
    createdAt DATETIME,
    updatedAt DATETIME
);
```
```SQL
CREATE TABLE Ranks(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Name VARCHAR(255),
    ClimberID INT, 
    Points FLOAT(6, 2), 
    createdAt DATETIME, 
    updatedAt DATETIME
);
```
```SQL
CREATE TABLE Admin (
    UserName VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255)
 );
 ```
 ```SQL
CREATE TABLE Results(
    WCC_ID INT,
    Climber_ID INT,
    ClimberRank INT,
    Qualification VARCHAR(255),
    SemiFinal VARCHAR(255),
    Final VARCHAR(255),
    EventType VARCHAR(255),
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (WCC_ID) REFERENCES Events(id) ,
    FOREIGN KEY (Climber_ID) REFERENCES Climbers(id)
);
```
```SQL
CREATE TABLE Records(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    date  DATETIME,
    eventName VARCHAR(255),
    eventID INT,
    RecordTime INTc
    createdAt DATETIME,
    updatedAt DATETIME
);
```



# Environment Variables

Create a file named `.env` in the `server` directory and add the following environment variables to it.
Change the values according to what you need.

```bash
SERVER_PORT = 4000
SQL_PORT = 3306
DATABASE_NAME = 'climb'
SQL_USERNAME = 'root'
SQL_PASSWORD = 'root'
CLIMBER_TABLE = 'Climbers'
EVENT_TABLE = 'Events'
RANK_TABLE = 'Ranks'
JWT_SECRET_KEY = 'whateveryouwant'
```

If you add functionality that requires another variable,
let the group know and add it to the README.

# Getting backend started

### `cd server` change to server directory

### `nodemon index` starts server up

Must have db running for server to work or else it may crash and require a restart.

You must also `npm install <>`:
1. `axios` to the frontend
2. `mysql2` to the backend
3. `sequelize` to the backend
4. `express` to the backend
5. `jsonwebtoken` to the backend

`npm install` or `npm ci` should cover this but incase it doesn't you can manually install them.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

