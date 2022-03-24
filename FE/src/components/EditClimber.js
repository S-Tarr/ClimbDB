/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditClimber = () => {
    const [name, setName] = useState('');
    const history = useNavigate();
    const { id } = useParams();
 
    const updateClimber = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/climbers/${id}`,{
            name: name
        });
        history("/");
    }
 
    useEffect(() => {
        getClimberById();
    }, []);
 
    const getClimberById = async () => {
        const response = await axios.get(`http://localhost:5000/climbers/${id}`);
        setName(response.data.name);
    }
 
    return (
        <div>
            <form onSubmit={ updateClimber }>
                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
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
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditClimber