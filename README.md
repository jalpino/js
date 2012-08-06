js
==================
This is a kitchen sink repo for various tools and classes that I have written in JavaScript.

##LevenshteinDistance.js
A simple object that can be used to find the difference between two words using [Levenshtein's Distance](http://en.wikipedia.org/wiki/Levenshtein_distance) algorithm.

<i>Usage</i>

	var stringA = 'Hello',
	    stringB = 'Herro';
	
	// outputs '2' 
	console.log( LevenshteinDistance.getDistance( stringA, stringB ) );    


##jquery-ui.dialog.maximizable.js
A plug-in enhancement for jQuery UI dialogs that adds an additional control to expand the body of the dialog to the width and height of the screen.

<i>Usage</i>

	$('#dialog').dialog( { maxamizable:true } );
	
##DateHelper.js
A port of (CFWheels project)[http://code.google.com/p/cfwheels/source/browse/trunk/wheels/plugins/datehelpers/DateHelpers.cfc?spec=svn2241&r=2241] Date Helper to provide time differences in plain English. For example, "about 1 hour ago" instead of "58 minutes"

<i>Usage</i>

	var dt = null,
		now = new Date(),
		dates = {
			twoSecsAgo    : new Date( now.getTime() - (1000 * 2) ),
			fiveSecsAgo   : new Date( now.getTime() - (1000 * 5) ),
			tenSecsAgo    : new Date( now.getTime() - (1000 * 10) ),
			thirtySecsAgo : new Date( now.getTime() - (1000 * 30) ),
			oneMinAgo     : new Date( now.getTime() - (1000 * 60 * 1) ),
			fiveMinsAgo   : new Date( now.getTime() - (1000 * 60 * 5) ),
			oneHourAgo    : new Date( now.getTime() - (1000 * 60 * 60 * 1) ),
			threeHourAgo  : new Date( now.getTime() - (1000 * 60 * 60 * 3) ),
			oneDayAgo     : new Date( now.getTime() - (1000 * 60 * 60 * 24 * 1) ),
			fiveDaysAgo   : new Date( now.getTime() - (1000 * 60 * 60 * 24 * 5) ),
			oneMonthAgo   : new Date( now.getTime() - (1000 * 60 * 60 * 24 * 32) ),
			threeMonthsAgo: new Date( now.getTime() - (1000 * 60 * 60 * 24 * 92) ),
			oneYearAgo    : new Date( now.getTime() - (1000 * 60 * 60 * 24 * 365) )
		};
			
		// Exclude Seconds
		console.group("Seconds Excluded");
		for( dt in dates ){
			console.log( dt +" > "+ DateHelper.timeAgoInWords( dates[dt] ) );	
		}
		console.groupEnd();

		// Including Seconds
		console.group("Seconds Included");
		for( dt in dates ){
			console.log( dt +" > "+ DateHelper.timeAgoInWords( dates[dt], now, true ) );	
		}
		console.groupEnd();