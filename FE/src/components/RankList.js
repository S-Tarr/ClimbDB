import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import classes from './RankList.module.css'
var acs = 0;
var year = 2021;
var type = ""; 
const RankList = () => {
	const [ranks, setRank] = useState([]);
	function compare1( a, b ) {
		
		if ( a.Points < b.Points ){
		  return 1;
		}
		if ( a.Points > b.Points ){
		  return -1;
		}
		return 1;
	  }
	
	  function compare2( a, b ) {
		if ( a.Points < b.Points ){
		  return -1;
		}
		if ( a.Points> b.Points ){
		  return 1;
		}
		return 1;
	  }
	
	function myFunction(pyear, ttype){
		
		if(pyear != year||ttype != type){
			acs = 2
		}
		if(acs == 1 || acs == 0){
			acs = 2;
		} else {
			acs = 1
		}
		getRanks(pyear, ttype);
	
	}
	useEffect(() => {
		getRanks(2021, "Speed");
		console.log(ranks)
	}, []);
 
	const getRanks = async (SYear, Type) => {
		year = SYear
		type = Type
		
		const response = await axios.get(`http://localhost:4000/ranks/${SYear}-${Type}`);
		
		if(acs == 1){
			response.data.sort(compare1);
			setRank(response.data);
			
		} else if(acs == 2) {
			response.data.sort(compare2);
			setRank(response.data);
			

		} else {
			setRank(response.data);

		}
		console.log(response.data)
		
		
		
    }
   
	
    // getRanks();
    
	return (

		<div>
			
			<select name="cars" id="cars" onChange={(e) => myFunction(e.target.value.split(",")[0],e.target.value.split(",")[1])}>
  				<option value = {[2021,"Speed"]}>2021 Speed</option>
				<option value = {[2021,"Lead"]}>2021 Lead</option>
				<option value = {[2021,"Boulder"]}>2021 Boulder</option>
				<option value = {[2019,"Speed"]}>2019 Speed</option>
				<option value = {[2019,"Lead"]}>2019 Lead</option>
				<option value = {[2019,"Boulder"]}>2019 Boulder</option>
  				
				<option value = {[2018,"Speed"]}>2018 Speed</option>
				<option value = {[2018,"Lead"]}>2018 Lead</option>
				<option value = {[2018,"Boulder"]}>2018 Boulder</option>
  				
				<option value = {[2017,"Speed"]}>2017 Speed</option>
				<option value = {[2017,"Lead"]}>2017 Lead</option>
				<option value = {[2017,"Boulder"]}>2017 Boulder</option>
  				
  				
			</select>
			
			{/* <button onClick={ () => myFunction(2017, "Lead")}>2017</button>
			<button onClick={ () => myFunction(2018, "Lead")}>2018</button>
			<button onClick={ () => myFunction(2019, "Lead")}>2019</button>
			<button onClick={ () => myFunction(2021, "Lead")}>2021</button>
			<button onClick={ () => myFunction(2017, "Speed")}>2017</button>
			<button onClick={ () => myFunction(2018, "Speed")}>2018</button>
			<button onClick={ () => myFunction(2019, "Speed")}>2019</button>
			<button onClick={ () => myFunction(2021, "Speed")}>2021</button>
			<button onClick={ () => myFunction(2017, "Boulder")}>2017</button>
			<button onClick={ () => myFunction(2018, "Boulder")}>2018</button>
			<button onClick={ () => myFunction(2019, "Boulder")}>2019</button>
			<button onClick={ () => myFunction(2021, "Boulder")}>2021</button> */}
			
			<table className={classes.maintable}>
				<thead>
					<tr>
						
					<th onClick={ () => myFunction(year, type) } >Ranking</th>
						<th>Climber Name</th>
						<th onClick={ () => myFunction(year, type) }># Points</th>
						
						
					</tr>
				</thead>
				<tbody>
					{ ranks.map((rank, index) => (
						<tr key={ rank.id }>
							<td>{ acs < 2 ? index+1 : ranks.length-index}</td>
                           
                            
                            
							<td>{ rank.name }</td>
							<td>{ rank.Points }</td>
							
							
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default RankList