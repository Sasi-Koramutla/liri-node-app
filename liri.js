require("dotenv").config();

var keys = require("./key");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require('fs');

var cmdInput = process.argv[2];

    switch (cmdInput) {
        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            if (process.argv[3] != null) {
                    var song = process.argv.slice(3).join('+');
                    spotifySong(song);
                }
            else {
                    spotifySong('The Sign');
                }
            break;

        case 'movie-this':
           if (process.argv[3] != null) {
            var movie = process.argv.slice(3).join('+');
            movieDetails(movie);
           }
           else {
            movieDetails('Mr. Nobody');
           }

            break;

        case 'do-what-it-says':
            spotifySong('I Want it That Way');
            break;
        };


// all of the code for my-tweets goes here
function myTweets() {
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'nodejs', count: 2};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) console.log(error);    
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
    
                console.log(' Tweet: ' + tweets[i].text);
                console.log(" Tweet Number: " + (i + 1));
                console.log(' Created: ' + tweets[i].created_at);
            }
          //console.log(response);
          console.log("Tweets here");
        }
      });
}


function spotifySong(song) {
    var spotify = new Spotify({id: "cf37d03f488e4c5c858c16ff0003cdda", secret: "78a7a21e61cb43fbbaba82e3eea2e45e"});
    spotify.search({
        'type': 'track',
        'query': song 
    }, function (error, data) {
        if (error) {
            console.log(error + "\n");
        }
        else {
                //console.log(data);

               console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
               console.log('Song Name: ' + data.tracks.items[0].name);
               console.log('Preview URL: ' + data.tracks.items[0].preview_url);
               console.log('Album Name: ' + data.tracks.items[0].album.name);

        }
    });
}


function movieDetails(movie) {
    var query = 'http://www.omdbapi.com/?t=' + movie + '&apikey=trilogy';
    request(query, function (error, response, body) {
        if (!error) {
            var movieDetails = JSON.parse(body);
                        console.log(" Title: " + JSON.parse(body)["Title"]);
                console.log(" Release Year: " + JSON.parse(body)["Released"]);
                console.log(" IMDB Rating: " + JSON.parse(body)["imdbRating"]);
                console.log(" Country: " + JSON.parse(body)["Country"]);
                console.log(" Language: " + JSON.parse(body)["Language"]);
                console.log(" Plot: " + JSON.parse(body)["Plot"]);
                console.log(" Actors: " + JSON.parse(body)["Actors"]);
                console.log(" Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                console.log(" Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
                console.log(" Website URL: " + JSON.parse(body)["Website"]); 

         }

         if (error) 
            console.log(error + "\n");
    });
}

