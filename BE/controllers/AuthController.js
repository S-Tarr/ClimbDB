import Authentication from "../models/AuthModel.js";

export const verifyLogin = async (req, res) => {
	const user = await Authentication.findAll({
		where: {UserName: req.body.username}
	});
	try {
		if(user.length == 0) { // user not found in table
			res.json({auth: false});
		} else {
			console.log(user);
			if(user[0].dataValues.Password == req.body.password) {
				res.send({auth: true});
			} else {
				res.send({auth: false});
			}
		}
	} catch (error) {
		res.json({message: error.message});
	}
}