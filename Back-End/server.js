const express = require('express');
const trackRoute = express.Router();
const multer = require('multer');

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.json());

const { Readable } = require('stream');



app.use("*",(req,res,next)=>{
  console.log("Middle ware is called");
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers","Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With,Accept");
  res.setHeader("Access-Control-Allow-Methods","*");
  res.setHeader("Access-Control-Allow-Credentials","true");
  
  next();
})

app.set('view engine' , 'ejs');

let db;
MongoClient.connect('mongodb://localhost/testingDB', (err, database) => {
  if (err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  }
  db = database;
});




app.use('/tracks', trackRoute);


trackRoute.get('/:trackID', (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch(err) {
    return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
  }
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: 'tracks'
  });

  //Returns a readable stream (GridFSBucketReadStream) for streaming file data from GridFS
  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    //console.log('bye')
    res.end();
  });
});


app.route('/images/:trackID').get(function(req, res) {
    try {
      var trackID = new ObjectID(req.params.trackID);
    } catch(err) {
      return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
    }
    res.set('content-type', 'image/jpeg');
    res.set('accept-ranges', 'bytes');
  
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'images'
    });
  
    //Returns a readable stream (GridFSBucketReadStream) for streaming file data from GridFS
    let downloadStream = bucket.openDownloadStream(trackID);
  
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });
  
    downloadStream.on('error', () => {
      res.sendStatus(404);
    });
  
    downloadStream.on('end', () => {
      //console.log('bye')
      res.end();
    });
  });







app.route('/metadata').get(function(req, res) {
  
  var collection = db.collection('images.files');
  var cursor = collection.find({});

  var arr = [];

  cursor.forEach(function(item) {
      if (item != null) {
          // link = item._id;
          // str = str + "    Song Name  " + item._id + "</br>";
          arr.push(item);
          console.log(item);

      }
  }, function(err) {
      //res.send(str);
      console.log(arr)
     // res.render('songs',{arr:arr})
    
     res.send(arr);
     // db.close();
    }
  );

});


app.route('/artist/:trackID').get(function(req, res) {
  
  var collection = db.collection('images.files');
  collection.findOne({"_id": new ObjectID(req.params.trackID)},function(err,result){
    res.send(result);
  });

  

});



trackRoute.post('/', (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fields: 5, fileSize: 6000000, files: 2, parts: 7 }});


  /*
  upload.single('track')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }
    


    
    
    */

    

   upload.fields([{
    name: 'track'
  }, {
    name: 'image'
  }])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }


    //console.log(JSON. stringify(req.body.name))
    
    //console.log(req.files)

    //console.log(req)
    //console.log(req.body)
    //console.log(JSON. stringify(req.body))

    let metadata = {
      songname: req.body.name,
      artist: req.body.artist,
      album: req.body.album,
      genre : req.body.genre,
      language : req.body.language
    }


    let trackName = req.body.name;
    
    // Covert buffer to Readable Stream
    
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.files.track[0].buffer);
    readableTrackStream.push(null);

    



    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'tracks'   //The 'files' and 'chunks' collections will be prefixed with the bucket name followed by a dot.
    });

    
    
    //Returns a writable stream (GridFSBucketWriteStream) for writing buffers to GridFS
    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      //console.log(uploadStream)
      //uploadStream.metadata = metadata

        const imgreadableTrackStream = new Readable();
        imgreadableTrackStream.push(req.files.image[0].buffer);
        imgreadableTrackStream.push(null);

        let imgbucket = new mongodb.GridFSBucket(db, {
            bucketName: 'images'   //The 'files' and 'chunks' collections will be prefixed with the bucket name followed by a dot.
          });

        let imguploadStream = imgbucket.openUploadStreamWithId(id, trackName,{metadata :{songname: req.body.name,
          artist: req.body.artist,
          album: req.body.album,
          genre : req.body.genre,
          language : req.body.language}})

            
        imgreadableTrackStream.pipe(imguploadStream)

        imguploadStream.on('error', () => {
            return res.status(500).json({ message: "Error uploading file" });
          });

          imguploadStream.on('finish', () => {
            
          
            return res.status(201).json({ message: "Both File uploaded successfully, stored under Mongo ObjectID: " + id });
          })
          
         
         
    });

  });

});



app.listen(3005, () => {
  console.log("App listening on port 3005!");
});