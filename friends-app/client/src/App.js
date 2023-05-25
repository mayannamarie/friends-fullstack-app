import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ProtectedRoutes from './components/protectedRoutes';
import Footer from './components/Footer';
import './css/app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//REQ-002 MOST IS DONE ALL THATS MISSING IS ONCE YOU CREATE REGISTER COMPNENT ADD TO ROUTE
const App = () => {  //it is now a class based component that can hold our state
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <div id="main-content">
          <Routes>
            <Route path='/' element={ <Main />} />
            <Route path='/signin' element= { <SignIn />} />
            <Route path='/register' element= { <Register />} />
            <Route element={<ProtectedRoutes />} >
               <Route path='/create' element = { <CreateForm />} />
               <Route path='/edit/:friendId' element = { <EditForm />} />
            </Route>    
            <Route path='*' element={ <NotFound /> } />
          </Routes>       
        </div>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}
//FUnctional component
const NotFound = () => {
  return <h1>Not found</h1>
}

export default App;
