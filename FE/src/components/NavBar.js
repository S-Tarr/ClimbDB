import React from 'react';
import {  Link } from "react-router-dom";
import LoginButton from "./LoginButton.js";

import classes from './NavBar.module.css'
const NavBar= () =>{
  return (
    <header>
    <div className={classes.title}>
        <a> <Link to="/main">Climb DB</Link></a>
    </div>
<div className={classes.mid}>
    <ul className = {classes.nav}>
         <li>
            <Link to="/#">Climbers</Link>
        </li>
        <li>
            <Link to="/events">Events</Link>
        </li>
        <li>
            <Link to="/results">Results</Link>
        </li>
        <li>
        <Link to="/wr">World Records</Link>
        </li>
        <li>
            <Link to="/ranks">Ranking</Link>
        </li>
        
    </ul>

</div>
<div className={classes.right}><LoginButton /></div>


</header>
  );
}
export default NavBar;
