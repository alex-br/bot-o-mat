import React, { useState } from 'react';
import TYPES from '../enum/typeData';

function Form({ addRobot, clear, errors }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        // if (!name || !type) return; // !'' True
        
        // Runs callback
        if(addRobot(name, type)) {
	        // Clears data
	        setName('');
	        setType('');

        }        
    }
    
    const types = Object.entries(TYPES);

    return (
        <form onSubmit={handleSubmit}>
            {errors.map(
        		(error, index) => <div key={`error-${index}`} className="error">{error}</div>
            )}
            <label className="ln">
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>

            <label className="lp">
                <select value={type} onChange={e => setType(e.target.value)} >
                	<option value="">Please select a type</option>
                    {types.map(
	                    ([type, typeName], index) => <option key={`typeOption-${index}`} value={type}>{typeName}</option>
	                )}
                </select>
            </label>

            <input className="btn" type="submit" value="Submit" />
            <input className="btn clear" type="button" value="Clear" onClick={clear} />       
        </form>
    )
}

export default Form;