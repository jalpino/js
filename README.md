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
	
