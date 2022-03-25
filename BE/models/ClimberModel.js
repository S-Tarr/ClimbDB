import { Sequelize } from "sequelize";
import 'dotenv/config.js';
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Product = db.define('Climber',{
	name:{
		type: DataTypes.STRING
	}, 
	weight:{
		type: DataTypes.INTEGER
	},
	hometown:{
		type: DataTypes.STRING
	},
	isMale:{
		type: DataTypes.BOOLEAN
	}
},{
	tableName: `${process.env.CLIMBER_TABLE}`
});
 
export default Product;