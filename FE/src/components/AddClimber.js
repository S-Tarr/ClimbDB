import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from 'react';
import LoginPage from './LoginPage';
 
const AddClimber = () => {
	const userInfo = useContext(UserContext);
	const [name, setName] = useState('');
	const [hometown, setHometown] = useState('');
	const history = useNavigate();
 
	const saveClimber = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:4000/climbers',{
			name: name,
			hometown: hometown,
		});
		history("/climbers");
	}
 
	if(userInfo.valid) {
		return (
			<div>
				<form onSubmit={ saveClimber }>
					<div className="field">
						<label className="label">Name</label>
						<input 
							className="input"
							type="text"
							placeholder="Name"
							value={ name }
							onChange={ (e) => setName(e.target.value) }
						/>
					</div>
					<div>
						<label>Hometown</label>
						<input
							type="text"
							placeholder="Hometown"
							onChange={ (e) => setHometown(e.target.value) }
						/>
					</div>
					<div className="field">
						<button className="button is-primary">Save</button>
					</div>
				</form>
			</div>
		);
	} else {
		return(
			<LoginPage />
		)
	}
}
 
export default AddClimber;