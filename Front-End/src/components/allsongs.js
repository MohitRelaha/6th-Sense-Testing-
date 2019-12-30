import React, { Component } from 'react'

export class AllSongs extends Component {


    render() {
        return (
            <div className="gridViewContainer">
                
                    {
                        this.props.arr.map((s,index)=>{
                        return <div className="gridViewItem" key={index} > 
                            <br/>
                            <div className="gridViewItem"  style={{color:"white"}}>
                                <img src={`http://localhost:3005/images/${s._id}`} onClick={()=>this.props.play(s._id)} alt={s.filename}/>
                                
                                <div className="gridViewInfo" >
                                    <span onClick={()=>this.props.play(s._id)}>{s.filename}</span> <br/>
                                    <button onClick={()=>this.props.play(s._id)} style={{backgroundColor:"green"}}>Play </button>
                                    <button onClick={()=>this.props.pause(s._id)} style={{backgroundColor:"blue"}}>Pause </button>
                                    <button onClick={()=>this.props.stop(s._id)} style={{backgroundColor:"red"}}>Stop</button>
                                </div>
                            </div>
                            
                                
                        </div>
                        })
                    }
                
            </div>
        )
    }
}

export default AllSongs


/*

    render() {
        return (
            <div id="gridViewContainer">
                <ul>
                    {
                        this.props.arr.map((s,index)=>{
                        return <div>
                            <br/>
                            <li key={index} onClick={()=>this.play(s._id)} style={{color:"white"}}>{s.filename}<img src={`http://localhost:3005/images/${s._id}`} style={{height:100},{width:100}}/></li>
                            <button onClick={()=>this.play(s._id)} style={{backgroundColor:"green"}}>Play </button>
                            <button onClick={()=>this.pause(s._id)} style={{backgroundColor:"blue"}}>Pause </button>
                            <button onClick={()=>this.stop(s._id)} style={{backgroundColor:"red"}}>Stop</button>
                        </div>
                        })
                    }
                </ul>
            </div>
        )
    }

*/





//=================================================================================================================================================77





/*


    constructor(){
        super()
        this.state = {
            source : 'a',
            nowPlaying:false,
            nowPlayingId:0,
            startedAt:0,
            pausedAt:0
        }
        this.play = this.play.bind(this)
        this.stop = this.stop.bind(this)
    }

     

    async play(id){
        //console.log(id)
        
        if(this.state.nowPlaying && id !== this.state.nowPlayingId)
            this.stop(this.state.nowPlayingId)
        

        if(this.state.nowPlaying === false)
        {
        
            const getAudioContext =  () => {
                AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContent = new AudioContext();
            
                return audioContent;
            };

   
            // load audio file from server
            const response =  await axios.get(`http://localhost:3005/tracks/${id}`, {
                responseType: 'arraybuffer'
            });

            // create audio context
            const audioContext = getAudioContext();

            // create audioBuffer (decode audio file)
            const audioBuffer =  await audioContext.decodeAudioData(response.data);
            
            console.log("duration = " + audioBuffer.duration);

            // create audio source
            this.state.source = audioContext.createBufferSource();
            this.state.source.buffer = audioBuffer;
            this.state.source.connect(audioContext.destination);
            
            

            // play audio
            if(id === this.state.nowPlayingId)
            {
                this.state.startedAt = Date.now() - this.state.pausedAt;
                this.state.source.start(0, this.state.pausedAt / 1000);
                this.state.nowPlaying = true;
            }
            else
            {
                this.state.startedAt = Date.now()
                this.state.pausedAt = null

                this.state.source.start();

                this.state.nowPlaying = true;
                this.state.nowPlayingId = id;
            }



        }
       
    }


    stop(id){
        if(id === this.state.nowPlayingId && this.state.nowPlaying){
            this.state.source.stop()
            this.state.nowPlaying = false;
            this.state.pausedAt = null
            this.state.startedAt = null
        }
        
    }



    pause(id){
        if(id === this.state.nowPlayingId && this.state.nowPlaying){
            this.state.source.stop()
            this.state.pausedAt = Date.now() - this.state.startedAt
            this.state.nowPlaying = false;
        }
    }


*/