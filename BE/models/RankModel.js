import { Sequelize } from "sequelize";
import 'dotenv/config.js';
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Product = db.define('Rank',{
	
    Name:{
		type: DataTypes.STRING
	},
    ClimberID:{
		type: DataTypes.INTEGER
	},
	
	Points:{
		type: DataTypes.FLOAT(6, 2)
	}
	
},{
	tableName: `${process.env.RANK_TABLE}`
});
 
export default Product;