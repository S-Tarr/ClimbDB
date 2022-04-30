import Ranks from "../models/RankModel.js";
import Climbers from "../models/ClimberModel.js";
import { Sequelize, QueryTypes } from "sequelize";
const sequelize = new Sequelize('climb', 'root', 'root', {
    host: 'localhost',
    dialect:'mysql'
  });
export const getRanks= async (req, res) => {
    Climbers.hasOne(Ranks, {foreignKey:'ClimberID'});
    Ranks.belongsTo(Climbers);
    
	try {
		const ranks = await sequelize.query("SELECT Climbers.id, Climbers.name, Ranks.Points FROM `Ranks` JOIN `Climbers` ON Ranks.ClimberID = Climbers.id WHERE Ranks.SYear = 2021 ORDER BY Ranks.Points DESC LIMIT 50", { type: QueryTypes.SELECT });

        
		res.json(ranks);

		
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}


