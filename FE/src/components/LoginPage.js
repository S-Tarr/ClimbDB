import React, { useState, useEffect } from 'react';
import { UserContext } from '../App';
import { useContext } from 'react';
import axios from 'axios';

const LoginPage = () => {
	const userInfo = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = async (e) => {
		e.preventDefault();
		const response = await axios.post("http://localhost:4000/auth/gettoken", {
			username: username,
			password: password
		});
		userInfo.setToken({
			token: response.data.token,
			username: response.data.username
		});
	}

	if(!userInfo.valid) {
		return(
			<div>
				<h1>Enter Login Information</h1>
				<form onSubmit={login}>
					<div>
						<label>Username</label>
						<input
							type="text"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="button is-primary" type='submit'>Login</button>
				</form>
			</div>
		);
	} else {
		return(
			<button onClick={() => userInfo.setToken({username: "", token: "nottesttoken"})}>Logout</button>
		);
	}
}

export default LoginPage;