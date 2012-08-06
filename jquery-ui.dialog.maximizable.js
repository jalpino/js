/**
 * jquery-ui.dialog.maximizable.js
 * 
 * An extention for the jQuery Dialog to enable maximizing and minimizing dialog to the size of the viewable screen
 * 
 * Justin Alpino
 */
var _init = $.ui.dialog.prototype._init;
$.ui.dialog.prototype._init = function() {
	var self = this;
	_init.apply(this, arguments);
	
	if( self.options.maximizable ){
		$('<a href="##" class="ui-dialog-titlebar-maximize ui-corner-all" role="button"><span class="ui-icon ui-icon-newwin">maximize</span></a>')
			.insertBefore( self.uiDialogTitlebar.find('a') )
			.hover( function(){ 
						$(this).addClass('ui-state-hover'); 
					},
					function(){ 
						$(this).removeClass('ui-state-hover'); 
					})
			.click( function(){
				var $d = $('.ui-dialog-content', self.uiDialog),
					pos = {};
				
				// If we aren't maximized, then store info about the current state
				// and maximize, otherwise revert back to our original state
				if( ! $(this).hasClass('ui-state-expanded') ){
					
					var l = self.uiDialog.position().left,
					    t = self.uiDialog.position().top,
					    state = {
								position: [ l , t ], 				
								height: $d.dialog("option","height"),
								width: $d.dialog("option","width")
							};	
						
					$(this).data("originalState", state ).addClass('ui-state-expanded');
					
					// maximized state
					pos = {
						position:[10,10],
						height: $(window).height()-30,
						width: $(window).width()-20
					};
					
				}else{
					$(this).removeClass('ui-state-expanded');
					pos = $(this).data("originalState");
				}

				$d.dialog("option","height", pos.height );
				$d.dialog("option","width", pos.width );
				$d.dialog("option","position", pos.position );
			});
		
	}
	
};


