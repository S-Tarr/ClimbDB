import { Sequelize } from "sequelize";
import 'dotenv/config.js';
 
const db = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.SQL_USERNAME}`, `${process.env.SQL_PASSWORD}`, {
    host: `${process.env.HOSTNAME}`,
    dialect: "mysql",
    port: `${process.env.SQL_PORT}`
});
 
export default db;