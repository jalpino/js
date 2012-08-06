/**
 *  A Port of CFWheels DateHelper object 
 *  http://code.google.com/p/cfwheels/source/browse/trunk/wheels/plugins/datehelpers/DateHelpers.cfc?spec=svn2241&r=2241
 *  JAlpino
 */
DateHelper = {
	
	/**
	 * Converts a timestamp to a more friendly display of how long ago
	 * it was compared to now();
	 * @param fromTime        Date to compare from.
	 * @param toTime          (optional) Date to compare to, defaults to now().
	 * @param includeSeconds  (optional) Whether or not to include the number of seconds in the returned string.
	 * @return                a friendly display of time difference
	 */	
	timeAgoInWords : function( fromTime ){
		var theTime = new Date( fromTime );
		var toTime = arguments[1] || new Date();
		var includeSeconds = arguments[2] || false,
			minuteDiff = DateHelper.dateDiff('n', theTime, toTime),
			secondDiff = DateHelper.dateDiff('s', theTime, toTime),
			hours = 0,
			days = 0,
			years = 0,
			retVal = '';
		
		if( minuteDiff < 1){
			if( secondDiff < 60 )
				retVal = "less than a minute";
			else
				retVal = "1 minute";
			
			if ( includeSeconds ){
				if ( secondDiff < 5)
					retVal = "less than 5 seconds";
				else if ( secondDiff < 10)
					retVal = "less than 10 seconds";
				else if ( secondDiff < 20)
					retVal = "less than 20 seconds";
				else if ( secondDiff < 40)
					retVal = "half a minute";
			}
			
		}	
		else if( minuteDiff < 45 ){
			retVal = parseInt(minuteDiff) +" minutes";
		}
		else if( minuteDiff < 90 ){
			retVal = "about 1 hour";
		}
		else if( minuteDiff < 1440 ){
			hours = parseInt(Math.ceil(minuteDiff/60));
			retVal = "about "+ hours +" hours";
		}
		else if( minuteDiff < 2880 ){
			retVal = "1 day";
		}
		else if( minuteDiff < 43200 ){
			days = parseInt( minuteDiff/1440 );
			retVal = days +" days";
		}
		else if ( minuteDiff < 86400 ){
			retVal = "about 1 month";
		}
		else if ( minuteDiff < 525600 ){
			months = parseInt( minuteDiff/43200 );
			retVal = months +" months";
		}
		else if( minuteDiff < 657000 ){
			retVal = "about 1 year";
		}
		else if( minuteDiff < 919800 ){
			retVal = "over 1 year";
		}
		else if( minuteDiff < 1051200 ){
			retVal = "almost 2 years";
		}
		else if( minuteDiff >= 1051200 ){
			years = parseInt( minuteDiff/525600 );
			retVal = "over "+ years +" years";
		}
	
		return retVal;
	},
	
	/**
	 * Calculates the difference in time given a time part. Limited functionality
	 * @param part     n==Minutes, s==seconds
	 * @param fromTime valid js date object to compare from
	 * @param toTime   valid js date object to compare to
	 */
	dateDiff : function( part, fromTime, toTime){
		if( part != 'n' && part != 's' )
			throw "Invalid time part, please implement if you need it!";

		var diffS =  Math.abs(fromTime.getTime() - toTime.getTime()) / 1000;
		
		if( part == 'n') return (diffS / 60).toFixed(3); 
		
		if( part == 's') return diffS.toFixed(3);
	}
}