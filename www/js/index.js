// SOMETHING USEFUL ABOUT ADDING PLUGINS AND STUFF
// http://stackoverflow.com/questions/29970885/cordova-5-0-0-which-files-should-i-commit-to-git

function goSomewhere(screen) {
	console.log("YAY!");
	$.mobile.pageContainer.pagecontainer("change", screen, {});
}


//Show the background and header on various pages
$("body").on("pagecontainerbeforeshow", function( event, ui ) {
	console.log("function called");
	const destination = ui.toPage[0].id;;

});



$( document ).ready(function() {
	addRepeatedElements();
});


function addRepeatedElements() {

	// Format floating white box.
	$(".floating-box").addClass('ui-shadow ui-corner-all');

	// Add menu
	const menu = '<div data-role="header" data-position="fixed" class="thin header">' +
	'<div data-role="navbar" class="thin">' + 
					'<ul class="home-buttons">' + 
						'<li><a href="#home">Home</a></li>' + 
						'<li><a href="#my-bikes">My Bikes</a></li>' + 
						'<li><a href="#register">Register</a></li>' +
						'<li><a href="#lookup">Lookup</a></li>' + 
						'<li><a href="#profile">Profile</a></li>' + 
					'</ul>' + 
				'</div>' + 
				'</div>';

	$('.header-container').append(menu);
	//$('[data-role="header"]').header();	
	$('[data-role="navbar"]').navbar(); //TODO: Maybe add background stripey stuff here!

	
	// Add background
	$(".stripey-background").prepend("<div class='stripey'><hr><div class='stripe'></div><hr><div>");

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

	//insertSections();
}



/*function insertSections() {
	$(".insert").each(function() {
		console.log("got it!")
		console.log(this);
		//Get list of sections to insert
		var sections = $(this).attr("insert").split();
		for (section of sections) {
			const x = $("." + section).clone();
			console.log(x);
			console.log(x.clone());
			$(this).append(x);
		}
	})
}*/

