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
                                <span className="navItemLink" onClick={()=>this.props.changeURL()}>Browse</span>
                            </div>
                            
                            <div className="navItem">
                                <Link to="yourMusic" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Your Music</span></Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="profile" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Mohit Relaha</span></Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="dashboard/addSongs" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Add Songs</span></Link>
                            </div>

                            <div className="navItem">
                                <Link to="dashboard/addArtist" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Add Artist</span></Link>
                            </div>
                        </div>
                        
                        
                    </nav>
                </div>
            
        )
    }
}

export default Navbar
