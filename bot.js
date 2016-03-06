// ==== REQUIRED MODULES ====
var child_process = require("child_process"),
	Twit = require('twit'),
	fs = require('fs'),
	config = require('./config');

// ==== TWITTER API STUFF ====
var	T = new Twit(config);

postImage();
// postTweet();
// Tweet every hour.
// setInterval(postTweet, 1000*60*60);
// replyOnFollow();


function postImage() {
	var img_filename = 'phantom-capture.png',
    	cmd = 'phantomjs --local-to-remote-url-access=true ./phantom-script.js ' + img_filename;
	child_process.exec(cmd, postCanvas);
	function postCanvas() {
		var b64content = fs.readFileSync(img_filename, {encoding: 'base64'} );
		T.post('media/upload', {media_data: b64content}, uploaded);
	}
	function uploaded(err, data, response) {
		if (err) { console.log('Something went wrong with the upload.'); }
		else {
			var id = data.media_id_string,
				tweet = {
					status: '#p5js drawing powered by #phantomjs posted by #nodejs',
					media_ids: [id],
				};
			T.post('statuses/update', tweet, tweeted);
		}
	}
	function tweeted(err, data, response) {
		if (err) { 
			console.log('Something went wrong.'); 
		} else { 
			console.log('It worked! Posted image to Twitter.'); 
		}
	}
}

function replyOnFollow() {
	var stream = T.stream('user');
	stream.on('follow', function (data) {
		var name = data.source.name,
			screenName = data.source.screen_name,
			text = '@' + screenName + ' thanks for following!';
		postTweet(text);
	});
}

function getTweets() {
	//  Search Twitter for all tweets containing the word 'banana' since July 11, 2011
	T.get('search/tweets', 
		  { q: 'rainbow since:2011-07-11', count: 2 },
		  function(err, data, response) {
		  	var tweets = data.statuses;
		  	for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
		  	}
		  }
	);
}

function postTweet(text) {
	//  Tweet a status update.
	var tweet;
	if (text) {
		tweet = text;
	} else {
		tweet = '#randomnumber from node.js ' + Math.floor(Math.random() * 1000);
	}
	T.post('statuses/update',
		{ status: tweet }, 
		function(err, data, response) {
			if (err) { 
				console.log('Something went wrong.'); 
			} else { 
				console.log('It worked! Posted ' + tweet + ' to Twitter.'); 
			}
		}
	);
}