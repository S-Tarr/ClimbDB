
import { Sequelize, QueryTypes } from "sequelize";
const sequelize = new Sequelize('climb', 'root', 'root', {
    host: 'localhost',
    dialect:'mysql'
  });
export const getWR= async (req, res) => {
    
    
	try {
		const wr = await sequelize.query("SELECT Results.Climber_ID, Climbers.name, Results.Final, Events.eventTime, Events.id  FROM Results JOIN Climbers ON Results.Climber_ID = Climbers.id JOIN Events ON Events.id = WCC_ID WHERE EventType = \"Speed\" AND Results.Final LIKE \'_.%\' AND Events.eventTime > 2014 ORDER BY Results.Final LIMIT 1", { type: QueryTypes.SELECT });

        
		res.json(wr);

		
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}


