import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
 
const AddClimber = () => {
	const [name, setName] = useState('');
	const [weight, setWeight] = useState(0);
	const [hometown, setHometown] = useState('');
	const [isMale, setGender] = useState(0);
	const history = useNavigate();
 
	const saveClimber = async (e) => {
		e.preventDefault();
		console.log(name);
		console.log(weight);
		console.log(hometown);
		console.log(isMale);
		await axios.post('http://localhost:5000/climbers',{
			name: name,
			weight: weight,
			hometown: hometown,
			isMale: isMale
		});
		history("/");
	}
 
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
					<label>Weight</label>
					<input
						type="number"
						placeholder="0"
						onChange={ (e) => setWeight(e.target.value) }
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
				<div>
					<label>Gender</label>
					<select name="gender_dropdown" onChange={ (e) => setGender(e.target.value)}>
						<option value="" disabled selected>Select gender</option>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</select>
				</div>
 
				<div className="field">
					<button className="button is-primary">Save</button>
				</div>
			</form>
		</div>
	)
}
 
export default AddClimber