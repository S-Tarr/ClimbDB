import { useContext, useState } from "react"
import { UserContext } from "../App";

const LoginButton = () => {
	const userInfo = useContext(UserContext);
	if(userInfo.valid) {
		return(
			<div>
				<a><Link to="login">{userInfo.}</Link></a>
			</div>
		);
	}
}