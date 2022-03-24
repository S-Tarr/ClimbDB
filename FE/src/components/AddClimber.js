import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
 
const AddClimber = () => {
    const [name, setName] = useState('');
    const history = useNavigate();
 
    const saveClimber = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/climbers',{
            name: name,
        });
        history("/");
    }
 
    return (
        <div>
            <form onSubmit={ saveClimber }>
                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
 
                {/* <div className="field">
                    <label className="label">Price</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Price"
                        value={ price }
                        onChange={ (e) => setPrice(e.target.value) }
                    />
                </div> */}
 
                <div className="field">
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddClimber