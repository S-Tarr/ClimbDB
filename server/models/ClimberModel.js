import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Product = db.define('Climber',{
    name:{
        type: DataTypes.STRING
    }//, 
    // Weight:{
    //     type: DataTypes.INTEGER
    // },
    // Hometown:{
    //     type: DataTypes.STRING
    // },
    // Gender:{
    //     type: DataTypes.STRING
    // }
},{
    freezeTableName: true
});
 
export default Product;