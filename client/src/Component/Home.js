import React from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {
    const  identification = localStorage.getItem("identification");
  return (
    <div>
       {
         identification==null?<h1>Welcome to Our Notes App</h1>:
            <h1>Welcome to our Notes App 
                <NavLink to="/signin">Sign In</NavLink>
               </h1>
       }
    </div>
  )
}

export default Home