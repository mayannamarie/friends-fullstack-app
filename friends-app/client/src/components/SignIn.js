import React, { useState } from 'react';
import authService from '../services/authService';
import '../css/signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//convert to a state component so u can hold state for the forms
//have the form collect data and store/maintaining its own state
//submit via fetch or axios the data to the API, theres the endpoints you would be sending the data to, the endpoint is /login and register endpoint
//so we have to hook up form to that particular endpoint and your API should return a JSON Web token which will be sent back as a header token
//so in the form we need to store that token as local storage(found in application in inspect element, Application->Storage->website url-click to see it stores Key Value pair) 


const SignIn = (props) => {


    //defining state in this component using HOOKS! Yay
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  //setting the initial values of our state defined
    const [errors, setErrors] = useState({})      //setting to an instance of useState and instantiating it as an empty object

    //use the hook provided by react router
    const navigate = useNavigate();

    //function within our component
    const handleSubmit = event => {
        event.preventDefault()  ///prevents the form from doing a browser submit

        //reset any validation messages
        setErrors({})

        console.log("email " + email)
        console.log("pw " + password)
        //pass in email and pw as an object witht hose state values to send to the service as a credential
        authService.signin({ email: email, password: password }, error => {
            console.log(">>>>>  " + error)
            if (!error) { //if theres no error we navigate to the home page(navigate is true)
                console.log('SUCCESFUL LOGIN')
                navigate('/');
            } else {
                console.log('UNSUCCESFUL LOGIN' + error)


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
            {/* //its not this.handleSubmit cuz its not a class  */}
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <label htmlFor="inputEmail"
                className="sr-only">Email address
            </label>

            <input type="text"
                id="inputEmail"
                name="email"
                onChange={e => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address" />

            {
                errors.email && <div className="alert alert-danger">{errors.email.message}</div>
            }



            <label htmlFor="inputPassword"
                className="sr-only">
                Password
            </label>
            <input type="password"
                id="inputPassword"
                name="password"
                onChange={e => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password" />

            {
                errors.password && <div className="alert alert-danger">{errors.password.message}</div>
            }

            {
                errors.serverMessage && <div className="alert alert-danger">{errors.serverMessage}</div>
            }
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
}


export default SignIn;