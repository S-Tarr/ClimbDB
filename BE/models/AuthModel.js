import db from "../config/database.js";
import { DataTypes } from "sequelize";
import 'dotenv/config.js';

const Product = db.define('Admin',{
	UserName:{
		type: DataTypes.STRING,
        primaryKey: true
	}, 
	Password:{
		type: DataTypes.STRING
	}
},{
	tableName: `${process.env.ADMIN_TABLE}`,
    timestamps: false
});

export default Product;