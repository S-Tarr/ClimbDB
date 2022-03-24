import { Sequelize } from "sequelize";
 
const db = new Sequelize('testapp', 'root', 'helloworld', {
    host: "localhost",
    dialect: "mysql",
    port: "3308"
});
 
export default db;