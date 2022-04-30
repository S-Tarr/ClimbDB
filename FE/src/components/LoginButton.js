import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";

const LoginButton = () => {
	const userInfo = useContext(UserContext);
	if(!userInfo.valid) {
		return(
			<a><Link to="login">Login</Link></a>
		);
	} else {
		return(
			<a><Link to="login">{userInfo.username}</Link></a>
		)
	}
}

export default LoginButton;