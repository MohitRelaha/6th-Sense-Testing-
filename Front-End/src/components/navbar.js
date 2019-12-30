import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './styledash.css'
import logo from '../images/logo.png'
import search from '../images/search.png'

export class Navbar extends Component {
    render() {
        return (
            
                <div id="navBarContainer">
                    <nav className="navBar">
                        
                        <Link to="/"><img src={logo} alt="logo"/></Link>
                        
                        <div className="group">
                            
                            <div className="navItem">
                                <Link to="search" className="navItemLink">Search
                                    <img src={search} alt="search" className="icon"/>
                                </Link>
                            </div>
                            
                        </div>
                        
                        
                        <div className="group">
                            
                            <div className="navItem">
                                <Link to="browse" className="navItemLink">Browse</Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="yourMusic" className="navItemLink">Your Music</Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="profile" className="navItemLink">Mohit Relaha</Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="dashboard/addSongs" className="navItemLink">Add Songs</Link>
                            </div>
                        </div>
                        
                        
                    </nav>
                </div>
            
        )
    }
}

export default Navbar
