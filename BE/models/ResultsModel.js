import { Sequelize } from "sequelize";
import 'dotenv/config.js';
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Product = db.define('Results',{
	WCC_ID:{
		type: DataTypes.INTEGER
	}, 
	Climber_ID:{
		type: DataTypes.INTEGER
	},
	ClimberRank:{
		type: DataTypes.INTEGER
	},
	Qualification:{
		type: DataTypes.STRING
	},
	SemiFinal:{
		type: DataTypes.STRING
	},
	Final:{
		type: DataTypes.STRING
	},
	EventType:{
		type: DataTypes.STRING
	}
},{
	tableName: `${process.env.RESULTS_TABLE}`
});
 
export default Product;