import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import './styledash.css'
import AllSongs from './allsongs'
import Browse from './browse'
import AllArtists from './allArtists'

export class Display extends Component {

    render() {
        return (
            
                <div id="displayPartContainer">
                    <div id="displayPart">
                        {this.props.currentURL === 'allSongs' && <AllSongs arr={this.props.arr} play={this.props.play} pause={this.props.pause} stop={this.props.stop} artistSelected={this.props.artistSelected}/>}
                        {this.props.currentURL === 'browse' && <AllArtists arr={this.props.arr} artistArr={this.props.artistArr} artistBrowsed={this.props.artistBrowsed} />}    
                    </div>
                </div>
             
        )
    }
}

export default Display

//<Link to="dashboard/addSongs"><button>Add Songs</button></Link>
//<br/><br/>
//<Link to="dashboard/allSongs"><button>All Songs</button></Link>
