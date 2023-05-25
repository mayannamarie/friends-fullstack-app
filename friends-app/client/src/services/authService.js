//authservice is an object we can call upon to do things for us defined as a class (not a class component just a class)
//with this object we've taen away the responsibility of the conponent to talk to the API
import axios from 'axios';  //asking serivce to take care of this activity instead of  component

//now we will post the form data to the API for authentication
//we can use fetch or axios(better less code) , 1st param the location, 2nd what we are passing 
class authService {

    
    //args required for signin
   signin(credentials, callback){ //when u cal sign in you have to provide credentials (Theyre passed in by signin form component which provides those pieces of data)
    console.log('signin being called')
    console.log("cred email>>"+ credentials.email)
    console.log(">> "+ credentials.password)

    axios.post("http://localhost:5001/api/users/login", credentials)
       .then((response) => {
            console.log('running');
 
            if(response.status === 200) {  //if there is a token..store it
                console.log('succccccccccccccccesful')
                localStorage.setItem('token', response.headers['x-auth-token'])
                callback(null) //null means there was no error          
            }
        })     
        .catch(error => {
            console.log( "ERRORRRRRRRRRR>> " + error.response)
            callback(error.response) 
        })
    }

    register(credentials, callback){
        //we can use fetch or axios(better less code) , 1st param the location, 2nd what we are passing 
        console.log('register being called')
        axios.post("http://localhost:5001/api/users/register", credentials)
            
                // first_name: firstname,
                // last_name: lastname,
                // email: email,
                // password: password
            .then(response => {
            console.log('llllllllll');
            if (response.status === 201) {  //if there is a token..store it
                console.log('Succcesfully Registered')
                localStorage.setItem('token', response.headers['x-auth-token'])
                callback(null) //successful signup          
            }
        })
        .catch(error => {
            console.log( "ERRORRRRRRRRRR>> " + error)
            callback(error.response) 
        })
        //then provides the response when it arrives then we console log the response
    }



    create(credentials, callback){  
       
        console.log('create is being called')
        axios.post("http://localhost:5001/api/friends/create", credentials)  //we can use fetch or axios(better less code) , 1st param the location, 2nd what we are passing 
               
            .then(response => {
                console.log('llllllllll');
                if (response.status === 201) {  //if there is a token..store it
                    console.log('Succcesfully Created')
                    callback(null) //successful create   
            
                }
        })
        .catch(error => {
            console.log(error.response)
            callback(error.response) 
        })
        //then provides the response when it arrives then we console log the response
    }

    edit(id, credentials, callback){  
       
        console.log('edit is being called')
        axios.put('http://localhost:5001/api/friends/' + id, credentials)  //we can use fetch or axios(better less code) , 1st param the location, 2nd what we are passing 
               
            .then(response => {
                console.log('editing...');
                if (response.status === 200) {  //if there is a token..store it
                    console.log('Succcesfully Updated')
                    callback(null) //successful update
                }
        })
        .catch(error => {
            console.log(error.response)
            callback(error.response) 
        })
        //then provides the response when it arrives then we console log the response
    }

    getToken() {
        return localStorage.getItem('token')
    }


    isAuthenticated() {
        //returning whether or not the token is not null ..if i dont have a token it is null and will return false
        return localStorage.getItem('token') !== null
    }

    signout() {
        //deleting the token - being signed in depends on if we have a token
        localStorage.removeItem('token')

    }

}

export default new authService()