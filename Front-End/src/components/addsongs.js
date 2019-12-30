import React, { Component } from 'react'
import './stylelogin.css'

class AddSongs extends Component {

    render() {
        return (
            <div>
                <form action="http://localhost:3005/tracks" enctype="multipart/form-data" method="post">
                    <label for="name" style={{color:"black"}}>Songname</label>
                    <input type="text" id="name" name="name" style={{color:"black"}} />
                    <br/><br/>

                    <label for="name" style={{color:"black"}}>Artist</label>
                    <input type="text" id="artist" name="artist" style={{color:"black"}} />
                    <br/><br/>

                    <label for="name" style={{color:"black"}}>Album</label>
                    <input type="text" id="album" name="album" style={{color:"black"}} />
                    <br/><br/>

                    <label for="name" style={{color:"black"}}>Genre</label>
                    <input type="text" id="genre" name="genre" style={{color:"black"}} />
                    <br/><br/>

                    <label for="name" style={{color:"black"}}>Language</label>
                    <input type="text" id="language" name="language" style={{color:"black"}} />
                    <br/><br/>

                    <label for="track" style={{color:"black"}}>Upload Song</label>
                    <input type="file" id="track" name="track" style={{color:"black"}}/>
                    <br/><br/>

                    <label for="track" style={{color:"black"}}>Image</label>
                    <input type="file" id="image" name="image" style={{color:"black"}}/>
                    <br/><br/>

                    <input type="submit" value="Upload" style={{color:"black"}} />
                </form>  
            </div>
        )
    }
}

export default AddSongs