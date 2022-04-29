import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const EventList = () => {
	const [events, setEvent] = useState([]);
 
	useEffect(() => {
		getEvents();
		console.log(events)
	}, []);
 
	const getEvents = async () => {
		const response = await axios.get(`http://localhost:4000/events`);
		setEvent(response.data);
	}
 
	const deleteEvent = async (id) => {
		await axios.delete(`http://localhost:4000/events/${id}`);
		getEvents();
	}
 
	return (
		<div>
			
			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>Event ID</th>
						<th>Location</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Actions</th>
						
					</tr>
				</thead>
				<tbody>
					{ events.map((event, index) => (
						<tr key={ event.WCC_ID }>
							<td>{ index + 1 }</td>
							<td>{ event.location }</td>
							<td>{ event.startTime }</td>
							<td>{ event.endTime }</td>
							<td>
								<button onClick={ () => deleteEvent(event.id) } className="button is-small is-danger">Delete</button>
							</td>
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default EventList