/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditClimber = () => {
	const [name, setName] = useState('');
	const [weight, setWeight] = useState(0);
	const [hometown, setHometown] = useState('');
	const [isMale, setGender] = useState(0);
	const history = useNavigate();
	const { id } = useParams();
 
	const updateClimber = async (e) => {
		e.preventDefault();
		await axios.patch(`http://localhost:4000/climbers/${id}`,{
			name: name,
			weight: weight,
			hometown: hometown,
			isMale: isMale
		});
		history("/");
	}
 
	useEffect(() => {
		getClimberById();
	}, []);
 
	const getClimberById = async () => {
		const response = await axios.get(`http://localhost:4000/climbers/${id}`);
		setName(response.data.name);
		setWeight(response.data.weight);
		setHometown(response.data.hometown);
		setGender(response.data.isMale);
	}
 
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
					<label>Weight</label>
					<input
						type="number"
						placeholder="0"
						value={weight}
						onChange={ (e) => setWeight(e.target.value) }
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
				<div>
					<label>Gender</label>
					<select name="gender_dropdown" value={(isMale ? 1 : 0)} onChange={ (e) => setGender(e.target.value) }>
						<option value="" disabled>Select gender</option>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</select>
				</div>
 
				<div className="field">
					<button className="button is-primary">Save</button>
				</div>
			</form>
		</div>
	);
}
 
export default EditClimber