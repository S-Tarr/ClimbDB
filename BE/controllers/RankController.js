import Ranks from "../models/RankModel.js";
import Climbers from "../models/ClimberModel.js";
import { Sequelize, QueryTypes } from "sequelize";
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.SQL_USERNAME, process.env.SQL_PASSWORD, {
    host: process.env.HOSTNAME,
    dialect:'mysql',
	port: process.env.SQL_PORT
  });
export const getRanks = async (req, res) => {
    Climbers.hasOne(Ranks, {foreignKey:'ClimberID'});
    Ranks.belongsTo(Climbers);
    
	try {
		console.log("2021")
		var ctype = "Lead";
		if(req.params["SYear"]){
			await sequelize.query('SET @i = ' + req.params.SYear+';');
			console.log(req.params["SYear"])
	 	} else {
			await sequelize.query('SET @i = 2021;');
			console.log("2021")
		}
		if(req.params["Type"] == "Boulder"||req.params["Type"] == "Speed"||req.params["Type"] == "Lead"){
			
			ctype = req.params["Type"]
	 	} 
		
		const ranks = await sequelize.query("SELECT Climbers.id, Climbers.name, Ranks.Points FROM `Ranks` JOIN `Climbers` ON Ranks.ClimberID = Climbers.id  WHERE Ranks.SYear = @i AND Ranks.EventType = \"" + ctype+ "\" ORDER BY Ranks.Points DESC", { type: QueryTypes.SELECT });

        
		res.json(ranks);

		
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}


