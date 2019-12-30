import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import './styledash.css'
import AllSongs from './allsongs'
import Browse from './browse'

export class Display extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentURL : 'allSongs'
        }
    }
    render() {
        return (
            
                <div id="displayPartContainer">
                    <div id="displayPart">
                        {this.state.currentURL === 'allSongs' && <AllSongs arr={this.props.arr} play={this.props.play} pause={this.props.pause} stop={this.props.stop}/>}
                        {this.state.currentURL === 'browse' && <Browse arr={this.props.arr}/>}    
                    </div>
                </div>
             
        )
    }
}

export default Display

//<Link to="dashboard/addSongs"><button>Add Songs</button></Link>
//<br/><br/>
//<Link to="dashboard/allSongs"><button>All Songs</button></Link>