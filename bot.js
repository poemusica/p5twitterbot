// Twit documentation: https://github.com/ttezel/twit
console.log('Bot is starting.');

var Twit = require('twit'),
	config = require('./config'),
	T = new Twit(config);

// postTweet();
// Tweet every hour.
// setInterval(postTweet, 1000*60*60);
// replyOnFollow();

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