import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import { useContext } from 'react';
 
const EventList = () => {
	const userInfo = useContext(UserContext);
	const [events, setEvent] = useState([]);
 
	useEffect(() => {
		getEvents();
		// console.log(events)
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
						<th>Time</th>
						
						{userInfo.valid ? <th>Actions</th> : null}
						
					</tr>
				</thead>
				<tbody>
					{ events.map((event, index) => (
						<tr key={ event.WCC_ID }>
							<td>{ event.id}</td>
							<td>{ event.location }</td>
							<td>{ event.eventTime }</td>
							
							<td>
								{userInfo.valid ? <button onClick={ () => deleteEvent(event.id) } className="button is-small is-danger">Delete</button> : null}
							</td>
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default EventList