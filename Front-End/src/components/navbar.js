import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './styledash.css'
import logo from '../images/logo.png'
import search from '../images/search.png'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Navbar extends Component {
    
    constructor(){
        super()
        this.state = {
            username: cookies.get('username') 
        }
    }
    
    
    render() {
        //console.log("User Name : " + this.state.username)
        return (
                
                <div id="navBarContainer">
                    <nav className="navBar">
                        
                        <Link to="/" onClick={()=>this.props.stopIt()} ><img src={logo} alt="logo"/></Link>
                        
                        <div className="group">
                            
                            <div className="navItem">
                                <Link to="/dashboard/search" className="navItemLink" onClick={()=>this.props.stopIt()} >Search
                                    <img src={search} alt="search" className="icon"/>
                                </Link>
                            </div>
                            
                        </div>
                        
                        
                        <div className="group">
                            
                            <div className="navItem">
                            {/* <span className="navItemLink" onClick={()=>this.props.changeURL()}>Browse</span> */}
                                <Link to="/dashboard/browse"><span onClick={()=>this.props.stopIt()} className="navItemLink">Browse</span></Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="/yourMusic" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Your Music</span></Link>
                            </div>
                            
                            <div className="navItem">
                                <Link to="/profile" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Profile</span></Link>
                            </div>
                        
                            <div className="navItem">
                                <Link to="/dashboard/addSongs" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Add Songs</span></Link>
                            </div>

                            <div className="navItem">
                                <Link to="/dashboard/addArtist" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Add Artist</span></Link>
                            </div>
                        </div>
                        
                        
                    </nav>
                </div>
            
        )
    }
}

export default Navbar
