

  ///////////////////////////////////////
 ////		SETUP FUNCTIONS			////
///////////////////////////////////////


// When the app first loads, insert templates for repeated elements
// (such as headers) in the correct locations.
$( document ).ready(function() {
	addRepeatedElements();
});







//Insert repeated elements of code
function addRepeatedElements() {


	//Insert large sections of code which are used in multiple places.
	//TODO: Do we need this anymore?
	insertSections();

	// Format floating white box.
	$(".floating-box").addClass('ui-shadow ui-corner-all');

	// Add background (on big screens you get a stripe, not on mobile)
	if(!isMobile()) {
		$(".stripey-background").prepend("<div class='stripey'><div class='ok'><hr><div class='stripe'></div><hr></div></div>");
	} else {
		$(".stripey-background").prepend("<div class='stripey'></div>");
	}

	// Add text input fields
	$(".text-input").each(function() {
		const newDiv = '<div data-role="fieldcontain"><label for=' + $(this).name + '>' + $(this).attr('txt') + '</label><input type="text" name=' + $(this).name + ' id=' + $(this).name + ' value=' + $(this).attr('value') + ' data-clear-btn="true"></div>'
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


//Phonegap Stuff - make things look/act different depending on the platfom
//document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
// 	//addMenu();
// //	braintreeStuff();
// }


// function braintreeStuff() {
// 	console.log("brintree starting")
// 	braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
// 		container: 'dropin-container'
// 	});
// }


//TODO: Make sure this is what it's really doing
// Add Back button
$(document).bind('mobileinit',function(){
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.page.prototype.options.backBtnText = "Previous";
	$.mobile.page.prototype.options.backBtnTheme = "b";
});




//Insert large sections of code which are used in multiple places.
//TODO: Do we need this anymore?
function insertSections() {
	$(".insert").each(function() {
		//Get list of sections to insert
		var sections = $(this).attr("insert").split(" ");
		for (section of sections) {
			$(this).append($("." + section).clone()[0]);
		}
	});

}


// If we're in a browser, switch to a browser menu
function addMenu(isPolice = false) {
	console.log("add MEnu: ", isPolice);
	// Starts out with mobile menu visible.  If we're on a browser, this gets converted to our menu
	if (!isApp()) {
		let headerTemplate = Handlebars.templates["header"];

		//TODO: weird, but this works.  But we should really fix this sometime.
		$("#header-container").html(headerTemplate({police: isPolice}));
		$("#header-container").enhanceWithin();
		$('[data-role="header"]').html($(".browser-header").clone()[0].innerHTML);
		$('[data-role="navbar"]').navbar();
		$('[data-role="header"]').removeClass('header');
	} else {
		StatusBar.styleBlackOpaque();
	}
}

//TODO: Repeated functions in index.js!

function isApp() {
	//Taken here: //http://damien.antipa.at/blog/2014/02/08/3-ways-to-detect-that-your-application-is-running-in-cordova-slash-phonegap/
	//This method differenetiates between apps & browsers (so mobile & desktop browsers count as the same)
	//Useful for menus (deciding whether or not we want a back button)
	let hi = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
	return hi;
}



function isMobile() {
	//Taken here: http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
	//This method differenetiates between desktop and mobile (so mobile browsers and apps count as the same)
	return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
}



