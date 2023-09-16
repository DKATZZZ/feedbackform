/* eslint-disable no-undef */
import React, { Component } from 'react';

import Spinner from './spinner.js';
import Success from './Success.js';


const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '300px',
        margin: '0 auto'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        resize: 'vertical' // Allows vertical resizing only
    }
};


class FeedbackForm extends Component {
//   

constructor(props) {
    super(props);
    this.state = {
        employee_id:'',
        name: '',
        email: '',
        phone: '',
        comments: '',
        original: {
            employee_id:'',
            name: '',
            email: '',
            phone: '',
            comments: ''
        },
        errors: {
            employee_id:'',
            name: '',
            email: '',
            phone: '',
            comments: ''
        },
        loading: false,
        success: false,
        submitted:false
    };
}



handleInputChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    // Basic input sanitization
    const sanitizedValue = value.replace(/[<>]/g, '');

    switch (name) {
        case 'employee_id':
          errors.employee_id = sanitizedValue.length < 5 ? 'Employee Id atleast have 5 characters' : '';
        break;
        case 'name':
            errors.name = sanitizedValue.length < 3 ? 'Name must be at least 3 characters!' : '';
            break;
        case 'email':
            const validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            errors.email = validEmailRegex.test(sanitizedValue) ? '' : 'Email is not valid!';
            break;
        case 'phone':
            const validPhoneRegex = /^[0-9]{10}$/;
            errors.phone = validPhoneRegex.test(sanitizedValue) && sanitizedValue.length === 10 ? '' : 'Phone is not valid!';
            break;
        case 'comments':
            errors.comments = sanitizedValue.length > 200 ? 'Comments must be under 200 characters!' : '';
            break;
        default:
            break;
    }

    this.setState({ errors, [name]: sanitizedValue });
};

isButtonDisabled = () => {
    const { employee_id,name, email, phone, comments, original } = this.state;
    if (employee_id === original.employee_id && name === original.name && email === original.email && phone === original.phone && comments === original.comments) {
        return true;
    }
    return false;
};

handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    // Call your backend API here using fetch or axios
    try {
        const response = await fetch('http://localhost:3001/endpoint/api/postfeedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                employee_Id:this.state.employee_id,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                comments: this.state.comments
            })
        });

        if (response.ok) {
            this.setState({
                success: true,
                original: {
                    employee_Id:this.state.employee_id,
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    comments: this.state.comments
                }
            });
        } else {
            // handle API errors here
        }
    } catch (error) {
        console.error('There was an error sending the feedback', error);
    }

    this.setState({ loading: false });
       // Clear the form by resetting the state
       this.setState({
        employee_id:'',
        name: '',
        email: '',
        phone: '',
        comments: ''
    });
};
  render() {
    const { errors } = this.state;

    if (this.state.loading) {
        return <Spinner />;
    }

     if (this.state.submitted === true) {
            return <Success />;
        }
    return (
      <div className="form-container">
         <div>
            <h1>Employee Feedback</h1>
         </div>
        <form onSubmit={this.handleSubmit} style={styles.form}>
            <div className='input-group'>
                <label style={styles.label}>Employee ID</label>
                <input
                 type='text'
                 name='employee_id'
                 onChange={this.handleInputChange}
                 value={this.state.employee_id}
                 style={styles.input}
                 />
                 {errors.employee_id && <span className='error'>{errors.employee_id}</span>}
            </div>
          <div className="input-group">
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
              style={styles.input}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
              style={styles.input}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label style={styles.label}>Phone:</label>
            <input
              type="tel"
              name="phone"
              onChange={this.handleInputChange}
              value={this.state.phone}
              style={styles.input}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="input-group">
            <label style={styles.label}>Comments:</label>
            <textarea
              name="comments"
              onChange={this.handleInputChange}
              value={this.state.comments}
              style={styles.textArea}
            />
            {errors.comments && <span className="error">{errors.comments}</span>}
          </div>

          <button type="submit" disabled={this.isButtonDisabled()}>Submit</button>
        </form>
      </div>
    );
  }
}

export default FeedbackForm;

// const EmployeeFeedbackForm = () => {
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: ''
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Logic to send the data to the backend
//         // For example using fetch or axios.

//         setLoading(false);
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <div>
//             {loading ? (
//                 <Spinner />
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <input 
//                         type="text" 
//                         placeholder="Name" 
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                     <input 
//                         type="email" 
//                         placeholder="Email" 
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                     <input 
//                         type="text" 
//                         placeholder="Phone Number" 
//                         name="phoneNumber"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                     />
//                     <button type="submit">Submit</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default EmployeeFeedbackForm;
