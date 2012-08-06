/**
 * This class is used to compare strings for relative distance using 
 * the Levenshtein Distance algorithm. Essentially it determines how
 * many operations (adding of a letter, removing of a letter, substituting a letter) 
 * it takes to go from string A to string B.
 * 
 * According to Wikipedia, most 'innocent' misspellings differ by two operations
 * 
 * Justin Alpino
 * 
 */
LevenshteinDistance = {
  
	/**
	 * Uses Levenshtein algorithm to determine the relative distance(similarity) between two strings 
	 * @param str1 the base string to compare
	 * @param str2 the target string to compare
	 * @return     a relative distance (as a number) between the two strings 
	 */
	getDistance : function( base, target ){
		var cB = "", cT="";
		var lenB = base.length,
			lenT = target.length;
		var cost = 0;

		// If either of strings have have no length, return length of the other string 
		if( lenB == 0 )
			return lenT;
		if( lenT == 0)
			return lenB;
		
		// Build a matrix of 0..(target.length) rows and 0..(base.length) columns
		var matrix = [];
		for(i=0; i <= lenB; i++ ){
			matrix[i] = [];
			matrix[i][0] = i;
		}
		for(i=0; i <= lenT; i++ )
			matrix[0][i] = i;
		
		// Examine each of the characters in our base and target strings for distance 
		for (i=1; i <= lenB; i++){
			cB = base.charAt( i-1 );

			for (j=1; j<= lenT; j++) {
				cT = target.charAt(j-1);
				cost = cB.toLowerCase() === cT.toLowerCase() ? 0 : 1;
				matrix[i][j] = LevenshteinDistance.min( matrix[i-1][j] + 1,     // a deletion
														matrix[i][j-1] + 1, 	// an insertion
														matrix[i-1][j-1] + cost // a substitution
													   );
			}

		}

		return matrix[lenB][lenT];
	},

	/**	
	 * @return       the minimum value from the supplied arguments
	 */
	min : function( a, b, c){
		var themin = arguments[0] || 0;
		for( var i=0; i < arguments.length; i++){
			if( !isNaN(arguments[i]) && arguments[i] < themin )
				themin = arguments[i];
		}
		return themin;
	}
}