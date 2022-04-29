import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Product = db.define('Admin',{
	UserName:{
		type: DataTypes.STRING,
        primaryKey: true
	}, 
	Password:{
		type: DataTypes.STRING
	}
},{
	tableName: "Admin",
    timestamps: false
});

export default Product;