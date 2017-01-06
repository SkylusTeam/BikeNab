// SOMETHING USEFUL ABOUT ADDING PLUGINS AND STUFF
// http://stackoverflow.com/questions/29970885/cordova-5-0-0-which-files-should-i-commit-to-git

function goSomewhere(screen) {
	$.mobile.pageContainer.pagecontainer("change", screen, {});
}


$( document ).ready(function() {
	addRepeatedElements();
});


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	//Taken here:  //http://damien.antipa.at/blog/2014/02/08/3-ways-to-detect-that-your-application-is-running-in-cordova-slash-phonegap/
	//This method differenetiates between apps & browsers (so mobile & desktop browsers count as the same)
	//Useful for menus (deciding whether or not we want a back button)
	//// ADD BACK: const isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
	
	//Taken here: http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
	//This method differenetiates between desktop and mobil (so mobile browsers and apps count as the same)
	///// ADD BACK const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
	console.log("device ready");
	addMenu(false);
}

 
$(document).bind('mobileinit',function(){
	console.log("func called");
    $.mobile.page.prototype.options.addBackBtn  = true;
    $.mobile.page.prototype.options.backBtnText  = "Previous";
    $.mobile.page.prototype.options.backBtnTheme  = "b";
});



function addMenu(isApp) {
	console.log("in addMenu");
	// Starts out with mobile menu visible.  If we're on a browser, this gets converted to our menu
	if (!isApp) {
		console.log("replacing appStuff");
		$('[data-role="header"]').html($(".browser-header").clone()[0].innerHTML);
		$('[data-role="navbar"]').navbar();
		$('[data-role="header"]').removeClass('header');
	} else {
		StatusBar.styleBlackOpaque();
	}
	
}


function addRepeatedElements() {

	insertSections();

	// Format floating white box.
	$(".floating-box").addClass('ui-shadow ui-corner-all');
	
	// Add background
	$(".stripey-background").prepend("<div class='stripey'><div class='ok'><hr><div class='stripe'></div><hr></div></div>");

	// Add text input fields
	$(".text-input").each(function() {
		const newDiv = '<div data-role="fieldcontain"><label for=' + $(this).name + '>' + $(this).attr('txt') + '</label><input type="text" name=' + $(this).name + ' id=' + $(this).name + ' data-clear-btn="true"></div>'
		$(this).replaceWith(newDiv);
	});
	$("[data-role=fieldcontain]").fieldcontain();
	$("[type=text]").textinput();

	// Add flipswitch input fields
	$(".flipswitch-input").each(function() {
		const newDiv = '<div data-role="fieldcontain" class="flipswitch-holder"><label for=' + $(this).name + '>' + $(this).attr('txt') + '</label><input type="checkbox" data-role="flipswitch" name= ' + $(this).name + ' id= ' + $(this).name + ' checked="" data-mini="true"></div>';
		$(this).replaceWith(newDiv);
	});
	$("[data-role=fieldcontain]").fieldcontain();
	$("[data-role=flipswitch]").flipswitch();

}



function insertSections() {
	$(".insert").each(function() {
		//Get list of sections to insert
		var sections = $(this).attr("insert").split(" ");
		for (section of sections) {
			$(this).append($("." + section).clone()[0]);
		}
	});

}


