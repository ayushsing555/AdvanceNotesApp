import React from 'react'
import {NavLink} from "react-router-dom";
import "../App.css"
const Nav = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light position-relative">
                <NavLink className="navbar-brand" to="/"><img style={{borderRadius:"30px",marginLeft:"10px",border:"2px solid grey",outline:"2px outset black"}} src={"https://cdn.dribbble.com/userupload/3232136/file/original-0fd4209ff091851842570400d634352b.png?compress=1&resize=50x50"}></img></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ">
                        <li className="nav-item active">
                            <NavLink className="nav-NavLink" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-NavLink" to="/addnote">AddNote</NavLink>
                        </li>
                        <li className="nav-item dropdown ">
                            <NavLink className="nav-NavLink" to="/viewnote" id="navbarDropdown" role="button">
                                ViewNotes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-NavLink " to="/signup">SignUp</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-NavLink disabled" to="/signin">Signin</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 mr-3" >
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Nav