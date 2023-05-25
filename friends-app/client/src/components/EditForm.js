import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../css/signin.css';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';



const Edit = (props) => {
    //defining state in this component using HOOKS! Yay
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address1, setStreetNo] = useState('');
    const [address2, setCity] = useState('');
    const [address3, setCountry] = useState('');
    const [image, setImage] = useState(''); 

    let {friendId} = useParams();

    useEffect(() => {
        //will get our data
        dataService.getOneFriend(friendId, (friendData) => {
            console.log("1")
            if(friendData){
              console.log("PRINT> " + friendData.address[0].street_no)
              setFirstName(friendData.first_name)
              setLastName(friendData.last_name)
              setStreetNo(friendData.address ? friendData.address[0].street_no : "")
              setCity(friendData.address ? friendData.address[0].city : "")
              setCountry(friendData.address ? friendData.address[0].country : "")
              setImage(friendData.image)
            }
          })
      }, [])


    const [errors, setErrors] = useState({})


    //use the hook provided by react router
    const navigate = useNavigate();


    //function within our component

    const handleSubmit = event => {
        event.preventDefault()  ///prevents the form from doing a browser submit

        //reset any validation messages
        setErrors({})

        console.log('fname ' + firstname)
        console.log('lname ' + lastname)
        console.log('street' + address1)
        console.log('city' + address2)
        console.log('country' + address3)
        console.log('image' + image)

        //pass in email and pw as an object witht hose state values to send to the service as a credential
        authService.edit(friendId, {
            first_name: firstname,
            last_name: lastname,
            address: {
                street_no: address1,
                city: address2,
                country: address3
            },
            image: image
        }, error => {
            if (!error) { //if createSuccess is true naivgate
                console.log('SUCCESFUL UPDATE')
                navigate('/');
            } else {
                console.log('UNSUCCESFUL UPDATE' + error.data)

                if(error.status === 422){
                    //store any validation errors in state
                    console.log('422 error'+ error.status)
                    setErrors(error.data.errors)
                } else if (error.status === 401) {
                    console.log('401 error'+ error.status)
                    setErrors(error.data)
                }

            }
        })
    }

    return (

        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please Update a Friend</h1>
            <label htmlFor="firstname"
                className="sr-only">First Name
            </label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={e => setFirstName(e.target.value)}
                className="form-control"
                placeholder="Update your First Name"  /><br />
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
                value={lastname}
                onChange={e => setLastName(e.target.value)}
                className="form-control"
                placeholder="Update your Last Name" /><br />
            {
                errors.last_name && <div className="alert alert-danger">{errors.last_name.message}</div>
            }

            <label htmlFor="address"
                className="sr-only">Enter Your Street Address
            </label>
            <input type="text"
                id="address1"
                name="address1"
                value={address1 ? address1 : ""}
                onChange={e => setStreetNo(e.target.value)}
                className="form-control"
                placeholder="Type street number here"  /><br />
            {
                errors.address && <div className="alert alert-danger">{errors.address.message}</div>
            }

            <label htmlFor="address"
                className="sr-only">Enter Your City
            </label>
            <input type="text"
                id="address2"
                name="address2"
                value={address2 ? address2 : ""}
                onChange={e => setCity(e.target.value)}
                className="form-control"
                placeholder="City goes here"  /><br />
            {
                errors.address && <div className="alert alert-danger">{errors.address.message}</div>
            }


            <label htmlFor="address"
                className="sr-only">Enter Your Country
            </label>
            <input type="text"
                id="address3"
                name="address3"
                value={address3 ? address3 : ""}
                onChange={e => setCountry(e.target.value)}
                className="form-control"
                placeholder="Country goes here"  /><br />
            {
                errors.address && <div className="alert alert-danger">{errors.address.message}</div>
            }


            <label htmlFor="image"
                className="sr-only">Enter Your Image
            </label>
            <input type="text"
                id="image"
                name="image"
                value={image}
                onChange={e => setImage(e.target.value)}
                className="form-control"
                placeholder="Image goes here" /><br />
            {
                errors.image && <div className="alert alert-danger">{errors.image.message}</div>
            }

            {
                errors.serverMessage && <div className="alert alert-danger">{errors.serverMessage}</div>
            }

            <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
        </form>
    );
}

export default Edit;