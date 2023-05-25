import React, { useState } from 'react';
import authService from '../services/authService';
import '../css/signin.css';
import { useNavigate } from 'react-router-dom';


const Register = (props) => {

    //defining state in this component using HOOKS! Yay
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  //setting the initial values of our state defined

    const [errors, setErrors] = useState({})

    //use the hook provided by react router
    const navigate = useNavigate();

    //function within our component

    const handleSubmit = event => {
        event.preventDefault()  ///prevents the form from doing a browser submit

        setErrors({})

        // console.log('fname '+ firstname)
        // console.log('lname '+lastname)     
        // console.log('email' + email)
        // console.log('pw' + password)

        //pass in email and pw as an object witht hose state values to send to the service as a credential
        authService.register({ first_name: firstname, last_name: lastname, email: email, password: password }, error => {
            if (!error) { //if registerSuccess is true naivgate
                console.log('SUCCESFUL REGISTRATION')
                navigate('/');
            } else {
                console.log('UNSUCCESFUL REGISTRATION' + error)


                //save our validation errors in state
                // switch(error.status){
                //     case 422: {
                //         setErrors(error.data.errors); break;
                //     }
                //     case 401: {
                //         setErrors(error.data); break;
                //     }
                // }
                // ^^^^^^ is same as below 
                if (error.status === 422) {
                    //store any validation errors in state
                    console.log('422 error' + error.status)
                    setErrors(error.data.errors)
                } else if (error.status === 401) {
                    console.log('401 error' + error.status)
                    setErrors(error.data)
                }
            }
        })


    }

    return (

        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>
            <label htmlFor="firstname"
                className="sr-only">First Name
            </label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={e => setFirstName(e.target.value)}
                className="form-control"
                placeholder="Enter your First Name"
                required autoFocus /><br />
            {
                errors.first_name && <div className="alert alert-danger">{errors.first_name.message}</div>
            }

            <label htmlFor="lastname"
                className="sr-only">Last Name
            </label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={e => setLastName(e.target.value)}
                className="form-control"
                placeholder="Enter your Last Name" /><br />
            {
                errors.last_name && <div className="alert alert-danger">{errors.last_name.message}</div>
            }

            <label htmlFor="inputEmail"
                className="sr-only">Email address
            </label>
            <input type="email"
                id="inputEmail"
                name="email"
                onChange={e => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address" /><br />
            {
                errors.email && <div className="alert alert-danger">{errors.email.message}</div>
            }

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password"
                id="inputPassword"
                name="password"
                onChange={e => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password" /><br />
            {
                errors.password && <div className="alert alert-danger">{errors.password.message}</div>
            }

            {
                errors.serverMessage && <div className="alert alert-danger">{errors.serverMessage}</div>
            }

            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
    );
}

export default Register;