/*
 * native application menu
 */
exports.menu = function(browserWindow, app) {
	return [{
	    label: 'File',
	    submenu: [{
	        label: 'New connection',
	        click: function() {
	            browserWindow.webContents.send('call-new-conn');
	        }
	    },
	    {
	        label: 'Quit',
	        accelerator: 'Command+Q',
	        click: function() {
	            app.quit();
	        }
	    }]
	}];
};
