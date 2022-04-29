import { Sequelize } from "sequelize";
import 'dotenv/config.js';
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Product = db.define('Event',{
	
	location:{
		type: DataTypes.STRING
	},
	eventTime:{
		type: DataTypes.DATE
	}
},{
	tableName: `${process.env.EVENT_TABLE}`
});
 
export default Product;