import Authentication from "../models/AuthModel.js";

export const verifyLogin = async (req, res) => {
	const user = await Authentication.findAll({
		where: {UserName: req.body.username}
	});
	try {
		if(user.length == 0) { // user not found in table
			res.json({token: "nottesttoken"});
		} else {
			console.log(user);
			if(user[0].dataValues.Password == req.body.password) {
				res.json({token: "testtoken"});
			} else {
				res.json({token: "nottesttoken"});
			}
		}
	} catch (error) {
		res.json({message: error.message});
	}
}