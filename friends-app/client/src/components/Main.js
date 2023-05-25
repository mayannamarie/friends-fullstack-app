import React, { useState, useEffect } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import EditForm from './EditForm';
import dataService from '../services/dataService';
import { useNavigate } from 'react-router-dom';

// class Main extends React.Component {

//turning into a functional component, now we have 0 CLASS BASED COMPONENTS
const Main = (props) => {

  //define our state 
  // constructor(props) {
  //   super(props) 
  //   this.state = {
  //     friends: []
  //   }
  // }
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  //last method that fires during the mounting phase
  // componentDidMount() {
  //   dataService.getFriends(friends => {
  //     this.setState({friends: friends})
  //     //our components dont know anything about axios just data service since we importd it
  //   })
  // }
  const [q, setQ] = useState("");
  const [searchParam] = useState(["first_name"]);

  //will observe diff values in variables and if it changes it will run again, runs only once
  useEffect(() => {
    //will get our data
    dataService.getFriends(friends => {
      setFriends(friends)  //set friends with friends, will runs atleast once when component loads in
    })

  }, [])

  const onDelete = (friendId) => {
    console.log("DELETE CALLED " + friendId)
    dataService.deleteFriend(friendId, (err) => {
      console.log(err)
      if(err){
        console.log(err)   
        if(err.status === 401){
          console.log('UNAUTHORIZED')
        } 
        return
      }
      const updatedFriends = friends.filter(friend => {
        return friend._id !== friendId
      })
      // this.setState({friends: updatedFriends})
      setFriends(updatedFriends)
    })
  }

  const onEdit = (friendId) => {
    console.log("EDIT CALLED " + friendId)
    navigate('/edit/' + friendId, {id: friendId});
    // return (
    //   //<EditForm id={friendId} />
    // )
  }

  function search(items) {
    return items.filter((item) => {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            );
        });
    });
}

  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input type="search" className="form-control" placeholder="Search first names" value={q} onChange={(e) => setQ(e.target.value)}/>
            
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {
              
              search(friends).map(friend => {
                console.log('>>>' + friend._id)

                return (
                  //sending friend object      
                  <Card f={friend} key={friend._id.toString()} onDelete={(value) => { onDelete(value) }} onEdit={(value) => { onEdit(value) }}
                  />
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;