//this is for crud stuff
//get all my data,get one of my data, update, delete my data 

//instead of spreading axios all ver our applicaion were consolidating it so we can have everything in one module.
import axios from 'axios'

class dataService {
    // types of calls we want to do
    getFriends(callback) {
        //call your api data here,,using axios
        axios.get(`${process.env.REACT_APP_API_URL}/friends`)
            .then(response => {
                console.log(response.data)
                callback(response.data)  //instead of setting state here, getFriends will provide a callback with that data

            })
    }

    getOneFriend(id, callback) {
        console.log('get one friend being called')
        axios.get(`${process.env.REACT_APP_API_URL}/friends/` + id)
        .then(response => {
            console.log(response.data)
            callback(response.data)  //instead of setting state here, getFriends will provide a callback with that data
        })
    }

    createFriend(newFriend, callback) {
        console.log('create friend being called')
    }
    updateFriend() {
        console.log('update friend being called')
    }

    deleteFriend(id, callback) {
        console.log('delete friend being called foR id ' + id)
        axios.delete(`${process.env.REACT_APP_API_URL}/friends/`+ id)
            .then(response => {
                console.log(response.data)
                callback(response.data)
            })
    }
}

export default new dataService()