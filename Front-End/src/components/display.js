import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import './styledash.css'
import AllSongs from './allsongs'
import Browse from './browse'
import AllArtists from './allArtists'
import Language from './language'
import Search from './search'

export class Display extends Component {

    render() {
        if(this.props.currentURL === 'allSongs'){
        return (
            
                <div id="displayPartContainer">
                    <div id="displayPart">
                        <AllSongs arr={this.props.arr} play={this.props.play} pause={this.props.pause} stop={this.props.stop} artistSelected={this.props.artistSelected} langSelected={this.props.langSelected}/>
                    </div>
                </div>

        )
        }
        else if(this.props.currentURL === 'browse'){
            return(
                <div id="browseContainer">
                    <div id="displayPart">
                        <AllArtists arr={this.props.arr} artistArr={this.props.artistArr} stopIt={this.props.stopIt}/>
                        <Language arr={this.props.arr} artistArr={this.props.artistArr} />
                    </div>
                </div>
            )
        }
        else if(this.props.currentURL === 'search'){
            return(
                <div id="browseContainer">
                    <div id="displayPart">
                    <Search arr={this.props.arr} artistArr={this.props.artistArr} play={this.props.play} pause={this.props.pause} stop={this.props.stop} artistSelected={this.props.artistSelected} langSelected={this.props.langSelected} stopIt={this.props.stopIt}/>
                    
                    </div>
                </div>
            )
        }
    }
}

export default Display

//<Link to="dashboard/addSongs"><button>Add Songs</button></Link>
//<br/><br/>
//<Link to="dashboard/allSongs"><button>All Songs</button></Link>
