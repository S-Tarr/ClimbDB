import React, { useState, useEffect } from 'react';
import { UserContext } from '../App';
import { useContext } from 'react';

const LoginPage = () => {
	const userInfo = useContext(UserContext);

	if(!userInfo.isAdmin) {
		return(
			<div>
				<h1>Enter Login Information</h1>
				<form onSubmit={() => userInfo.toggle(!userInfo.isAdmin)}>
					<div>
						<label>Username</label>
						<input
							type="text"
							placeholder="Username"
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							type="password"
						/>
					</div>
					<button className="button is-primary">Login</button>
				</form>
			</div>
		);
	} else {
		return(
			<button onClick={() => userInfo.toggle(!userInfo.isAdmin)}>Toggle</button>
		);
	}
}

export default LoginPage;