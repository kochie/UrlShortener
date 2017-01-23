// require and instantiate express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
// base58 for encoding and decoding functions
const base58 = require('./base58.js');
const url = require('url');

// grab the url model
const Url = require('./../models/url');

// create a connection to our MongoDB
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


const app = express();

// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, '../public')));
// handles JSON bodies
app.use(bodyParser.json());
// handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    // route to serve up the homepage (index.html)
    res.sendFile(path.join(__dirname, '../views/index.html'));

});

app.post('/api/shorten', function(req, res){
    //  route to create and return a shortened URL given a long URL
    let longUrl = url.parse(req.body.url);
    let hostname = url.parse(req.body.hostname);
    let shortUrl = ''; // the shortened URL we will return

  // check if url already exists in database
    Url.findOne({long_url: longUrl.format()}, function (err, doc){
        if (doc){
            // base58 encode the unique _id of that document and construct the short URL
            shortUrl = hostname.format() + base58.encode(doc._id);

            // since the document exists, we return it without creating a new entry
            res.send({'shortUrl': shortUrl});
        } else {
            // The long URL was not found in the long_url field in our urls
            // collection, so we need to create a new entry:
            let newUrl = Url({
                long_url: longUrl.format()
            });

            // save the new link
            newUrl.save(function(err) {
                if (err){
                    console.log(err);
                }

                // construct the short URL
                shortUrl = `${req.protocol}://${req.headers.host}` + base58.encode(newUrl._id);

                res.send({'shortUrl': shortUrl});
            });
        }
    });
});

app.get('/:encoded_id', function(req, res){
    // route to redirect the visitor to their original URL given the short URL
    let base58Id = req.params.encoded_id;
    let id = base58.decode(base58Id);

    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc){
        if (doc) {
            // found an entry in the DB, redirect the user to their destination
            res.redirect(doc.long_url);
        } else {
            // nothing found, take 'em home
            res.redirect(`${req.protocol}://${req.headers.host}`);
        }
    });

});


app.listen(3001, function(){
    console.log('Server listening on port 3001');
});
