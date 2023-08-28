import React, { useState } from 'react';
import Spinner from './spinner';

const EmployeeFeedbackForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Logic to send the data to the backend
        // For example using fetch or axios.

        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default EmployeeFeedbackForm;
