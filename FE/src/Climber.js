import React from 'react';

function Climber() {
	return (
		<>
			<p>
				Enter climber name
			</p>
			<input type="text"/>
			<button type='submit'>Submit</button>
			<p>
				Enter weight (lbs)
			</p>
			<input type='number'/>
			<button type='submit'>Submit</button>
			<p>
				Enter climber hometown
			</p>
			<input type="text"/>
			<button type='submit'>Submit</button>
			<p>
				Enter climber gender
			</p>
			<select name='gender_dropdown'>
				<option value="" disabled selected>Select gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
		</>
	);
}

export default Climber;