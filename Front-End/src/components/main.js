import React, { Component } from 'react'
import Login from './login'
import Title from './title'
import Signup from './signup'
import DashBoard from './dashboard'
import Home from './home'
import PageNotFound from './error404'
import Forgotpw from './forgotpw'
import AddSongs from './addsongs'
import AllSongs from './allsongs'
import AddArtist from './addartist'
import Browse from './browse'
import Premium from './premium'
import NoService from './noService'
import About from './aboutUs'
import Help from './help'
import './stylelogin.css'
import './universal.css'

import {Link,Route,Switch} from 'react-router-dom'


class Main extends Component {

    // constructor(){
    //     super()
    //     // this.state = {
    //     //     arr:[],
    //     //     artistArr:[]
    //     // }
    // }


    // componentDidMount(){
    //     fetch('http://localhost:3005/tracks/metadata')
    //         .then(res => res.json())   // return json format : actual data is always in form of string
    //         .then(res => {
    //           this.setState({arr : res})
    //           console.log('arr = ' + this.state.arr)
    //           console.log('HOW MANY TIME')
    //         })

    //     fetch('http://localhost:3005/tracks/artist')
    //     .then(res => res.json())   // return json format : actual data is always in form of string
    //     .then(res => {
    //         this.setState({artistArr : res})
    //         console.log('ArtistArr = ' + this.state.artistArr)
    //     })
    // }


    render() {
        return (
            <div>
                <Switch>
                    <Route exact path ='/' render={() => (<div id="background"><Home/></div>)}/>
                    <Route exact path ='/login' render={() => (<div id="background"><Login/> <Title/></div>)}/> 
                    <Route exact path ='/signup' render={() => (<div id="background"><Signup/> <Title/></div>)}/>
                    <Route exact path ='/dashboard' render={() => (<DashBoard requestedURL="allSongs"/>)}/>
                    <Route exact path ='/forgotpw' render={() => (<Forgotpw/>)}/>
                    <Route exact path ='/premium' render={() => (<Premium/>)}/>
                    <Route exact path ='/about' render={() => (<About/>)}/>
                    <Route exact path ='/help' render={() => (<Help/>)}/>
                    <Route exact path ='/noService' render={() => (<NoService/>)}/>
                    <Route exact path ='/dashboard/addSongs' render={() => (<AddSongs/>)} />
                    <Route exact path ='/dashboard/addArtist' render={() => (<AddArtist/>)} />
                    
                    {/* <Route exact path ='/dashboard/allSongs' render={() => (<AllSongs arr={this.state.arr}/>)}/> */}
                    <Route exact path ='/dashboard/search' render={() => (<DashBoard  requestedURL="search"/>)}/>
                    <Route exact path ='/dashboard/browse' render={() => (<DashBoard  requestedURL="browse"/>)}/>
                    <Route exact path ='/dashboard/browse/artists' component={(props) => (<DashBoard requestedURL="artist" location={ props.location } />)}/>
                    {/* <Route exact path ='/dashboard/browse/artists' render={() => (<DashBoard arr={this.state.arr} artistArr={this.state.artistArr} requestedURL="artist"/>)}/> */}
                    {/* <Route exact path ='/browse' render={() => (<Browse artistArr={this.state.artistArr} arr={this.state.arr}/>)}/> */}
                    <Route exact path ='/dashboard/browse/language' component={(props) => (<DashBoard requestedURL="language" location={ props.location } />)}/>
                    <Route render={() => (<PageNotFound/>)}/>
                </Switch>
            </div>
        )
    }
}

export default Main

