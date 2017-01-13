// SOMETHING USEFUL ABOUT ADDING PLUGINS AND STUFF
// http://stackoverflow.com/questions/29970885/cordova-5-0-0-which-files-should-i-commit-to-git



function goSomewhere(screen) {
	$.mobile.pageContainer.pagecontainer("change", screen);
}
//{ dataUrl : "page2.html?paremeter=123", data : { 'paremeter' : '123' }, reloadPage : true, changeHash : true }

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
	const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
	addMenu(isMobile);
}

 
$(document).bind('mobileinit',function(){
    $.mobile.page.prototype.options.addBackBtn  = true;
    $.mobile.page.prototype.options.backBtnText  = "Previous";
    $.mobile.page.prototype.options.backBtnTheme  = "b";
});



function addMenu(isApp) {
	// Starts out with mobile menu visible.  If we're on a browser, this gets converted to our menu
	if (!isApp) {
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


//TODO: Keep this if 
function goToTerms() {
	cordova.InAppBrowser.open("https://skylusteam.github.io/BikeNab/www/Terms-of-service.pdf", '_blank');
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


let testUser = '{' +
'"profile": {' +
'	"name": "myname",' +
'	"email": "myemail",' +
'	"backupEmail": "mybackupemail",' +
'	"birthdate": "mybirthdate",' +
'	"address": "myaddress",' +
'	"cellphone": "mycellphone",' +
'	"socialMedia": "mysocialMedia"' +
'},' +
'"bikes": [' +
'	{' +
'		"serial": "mySerial2",' +
'		"make": "myMake" ,'+
'		"model": "", ' +
'		"year": "myYear", '  +
'		"purchasePlace": "", '+
'		"value": "myValue", '  +
'		"otherInfo": "myOtherInfo", ' +
'		"status": "Okay"' +
'	},' +
'	{' +
'		"serial": "12321",' +
'		"make": "coolBike" ,'+
'		"model": "reallycool", ' +
'		"year": "myYear", '  +
'		"purchasePlace": "mypurchasePlace", '+
'		"value": "myValue", '  +
'		"otherInfo": "myOtherInfo", ' +
'		"status": "Okay"' +
'	}' +
'],' +
'"reports": [' +
'	{' +
'		"serial": "mySerial", ' +
'		"incidentNumber": "myIncidentNumber", ' +
'		"officerName": "myOfficerName", ' +
'		"officerEmail": "myOfficerEmail", ' +
'		"description": "myDescription", ' +
'		"status": "stolen",' +
'		"contactOwner": true,' +
'		"contactPolice": true,' +
'		"date": "myDate" ' +
'	}' +
'],' +
'"privacy": {' +
'		"individualSearchStolen": 0, ' +
'		"policeSearchNormal": 1, ' +
'		"policeSearchStolen": 2 ' +
'}' +
'}'

var userData = JSON.parse(testUser);
//TODO: Add back in images
//http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/

//Sheer brilliance here: http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional

//This one will return nothing if the condition is false
Handlebars.registerHelper('IF', function(var1, operator, var2, options) {
	switch(operator) {
		case "===":
			return (var1 === var2) && options.fn(this);
		default:
			//console.log("last case");
			return;
	}
})

// Handlebars.registerHelper('exists', function(value) {
// 	console.log(value && "value=" + value);
// 	return value && "value=" + value;
// })

//TODO: structure these

Handlebars.registerHelper('lowercase', function(word) {
	return word.toLowerCase();
});

Handlebars.registerHelper('contact', function(contactOwner, contactPolice) {
	if (contactOwner) {
		if (contactPolice) {
			return "Contact owner and contact local police";
		} else {
			return "Contact owner";
		}
	} else {
		if (contactPolice) {
			return "Contact local police";
		} else {
			return "no specified instructions";
		}
	}
});


allHandleBarsStuff();

function allHandleBarsStuff() {
	//insertTextFields();
	let profileData = userData.profile;
	Object.assign(profileData, userData.privacy);
	insertTemplate(profileData, "#profile-content", "#profile-container");
	insertTemplate(userData, "#my-bikes-content", "#my-bikes-container");
}


// function insertTextFields() {
// 	let templateScript = $("#text-input-content").html();  
// 	let template = Handlebars.compile(templateScript);  
	
// 	$(".text-input").each(function() {
// 		let data = {
// 			text: $(this).attr('text'), 
// 			value: $(this).attr('value'),
// 			name: $(this).name 
// 		};
// 		$(this).replaceWith(template(data));
// 	});
// 	$(".text-input").enhanceWithin();		
// }


function insertTemplate(data, templateID, containerID) {
	var templateScript = $(templateID).html();  
	 var template = Handlebars.compile(templateScript);  
	$(containerID).html(template(data));
	$(containerID).enhanceWithin();
}


$(".toBikeDetail").click(function() {
	//data.currBike = $(this).attr('serial');
	if(typeof(Storage) != "undefined") {
		console.log($(this).attr('serial'));
  		localStorage.serial=$(this).attr('serial');
  		console.log("in storage: " + localStorage.serial);
  		console.log($(this).attr('serial'));
  	}
	goSomewhere("#bike-detail");
})


$("body").on('pagecontainerbeforeshow', function(event, data) {
	console.log("right function");
	console.log(data.toPage[0].id);
	switch (data.toPage[0].id) {
		case 'bike-detail':
			return reachedBikes();
		case 'edit-bike-info':
			return reachedEditBikeInfo();
		case 'register':
			return reachedRegisterBikeInfo();
		case 'past-reports':
			return reachedPastReports();
	}
});

function reachedBikes() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === localStorage.serial) {
			console.log("got it: " + localStorage.serial);
			insertTemplate(bike, "#bike-detail-content", "#bike-detail-container");
		}
	}
}


function reachedEditBikeInfo() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === localStorage.serial) {
			console.log("got it: " + localStorage.serial);
			console.log(bike);
			insertTemplate(bike, "#bike-info-content", "#edit-bike-info-container");
		}
	}
}

function reachedRegisterBikeInfo() {
	insertTemplate(null, "#bike-info-content", "#register-bike-info-container");
}

function reachedPastReports() {
	insertTemplate(userData, "#reports-content", "#past-reports-container");
}



//   $("body").on("pagecontainerbeforeshow", 
//     function( event, ui ) {
//     	console.log("HI");
//          if(ui.toPage[0].id === "new_page"){
//               // Do stuff
//          }
//     }
// );


  	//console.log(data.currBike);
  	// let serial = data.prevPage.find('.toBikeDetail').attr('serial');
  	// console.log(serial);