/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from 'react';
import LoginPage from './LoginPage';
 
const EditClimber = () => {
	const userInfo = useContext(UserContext);
	const [name, setName] = useState('');
	const [hometown, setHometown] = useState('');
	const history = useNavigate();
	const { id } = useParams();
	const updateClimber = async (e) => {
		e.preventDefault();
		await axios.patch(`http://localhost:4000/climbers/${id}`,{
			name: name,
			hometown: hometown
		});
		history("/");
	}
 
	useEffect(() => {
		getClimberById();
	}, []);
 
	const getClimberById = async () => {
		const response = await axios.get(`http://localhost:4000/climbers/${id}`);
		setName(response.data.name);
		setHometown(response.data.hometown);
	}

	if(!userInfo.valid) {
		return(
			<LoginPage />
		);
	} else {
		return (
			<div>
				<form onSubmit={ updateClimber }>
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
							value={hometown}
							onChange={ (e) => setHometown(e.target.value) }
						/>
					</div>
					<div className="field">
						<button className="button is-primary">Save</button>
					</div>
				</form>
			</div>
		);
	}
}
 
export default EditClimber;