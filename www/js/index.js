// SOMETHING USEFUL ABOUT ADDING PLUGINS AND STUFF
// http://stackoverflow.com/questions/29970885/cordova-5-0-0-which-files-should-i-commit-to-git



  ///////////////////////////////////////
 ////			TEMPORARY			////
///////////////////////////////////////



//TEST USER: Delete this when we have actual data

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
'		"serial": "mySerial",' +
'		"make": "myMake" ,'+
'		"model": "myModel", ' +
'		"year": "myYear", '  +
'		"purchasePlace": "mypurchasePlace", '+
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
'		"status": "Stolen"' +
'	}' +
'],' +
'"reports": [' +
'	{' +
'		"reportID": "myReport", ' +
'		"serial": "mySerial", ' +
'		"incidentNumber": "myIncidentNumber", ' +
'		"officerName": "myOfficerName", ' +
'		"officerEmail": "myOfficerEmail", ' +
'		"officerPhone": "myOfficerPhone", ' +
'		"description": "myDescription", ' +
'		"status": "Stolen",' +
'		"contactOwner": true,' +
'		"contactPolice": true,' +
'		"date": "myDate" ' +
'	}' +
'],' +
'"privacy": {' +
'		"individualSearchStolen": 0, ' +
'		"policeSearchNormal": 1, ' +
'		"policeSearchStolen": 2 ' +
'},' +
'"police": false' +
'}'

//TODO: Add back in images
var userData = JSON.parse(testUser);



  ///////////////////////////////////////
 ////		SETUP FUNCTIONS			////
///////////////////////////////////////


// When the app first loads, insert templates for repeated elements 
// (such as headers) in the correct locations.
$( document ).ready(function() {
	addRepeatedElements();
});

//TODO: Make sure all of these are relevant still.

//Insert repeated elements of code
function addRepeatedElements() {

	//Insert large sections of code which are used in multiple places.
	//TODO: Do we need this anymore?
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


//Phonegap Stuff - make things look/act different depending on the platfom
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	//Taken here:  //http://damien.antipa.at/blog/2014/02/08/3-ways-to-detect-that-your-application-is-running-in-cordova-slash-phonegap/
	//This method differenetiates between apps & browsers (so mobile & desktop browsers count as the same)
	//Useful for menus (deciding whether or not we want a back button)
	const isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
	
	//Taken here: http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
	//This method differenetiates between desktop and mobild (so mobile browsers and apps count as the same)
	const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
	addMenu(isMobile);
}

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





  ///////////////////////////////////////////
 ////		reachedPage FUNCTIONS		////
///////////////////////////////////////////


// These functions specify what should happen once we reach a new
// page, typically involving shoving data into a Handlebars template



//Huge mega switch statement telling what we should do when each page loads
$("body").on('pagecontainerbeforeshow', function(event, data) {
	switch (data.toPage[0].id) {
		case 'bike-detail':
			return reachedBikes();
		case 'edit-bike-info':
			return reachedEditBikeInfo();
		case 'register':
			return reachedRegisterBike();
		case 'past-reports':
			return reachedPastReports();
		case 'reports':
			return reachedReports();
		case 'report':
			return reachedReport();
		case 'edit-report':
			return reachedEditReport();
		case 'unregister':
			return reachedUnregister();
		case 'profile':
			return reachedProfile();
		case 'my-bikes':
			return reachedMyBikes();
		case 'lookup':
			return reachedLookup();
		default:
			console.log("You'd better do " + data.toPage[0].id);
	}
});



//TODO: Can we reuse code among any of these?

function insertTemplate(data, templateID, containerID) {
	var templateScript = $(templateID).html();  
	 var template = Handlebars.compile(templateScript);  
	$(containerID).html(template(data));
	$(containerID).enhanceWithin();
}


function reachedBikes() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === sessionStorage.serial) {
			insertTemplate(bike, "#bike-detail-content", "#bike-detail-container");
		}
	}
}


function reachedEditBikeInfo() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === sessionStorage.serial) {
			insertTemplate(bike, "#bike-info-content", "#edit-bike-info-container");
		}
	}
}


function reachedRegisterBike() {
	insertTemplate(null, "#bike-info-content", "#register-bike-info-container");
}


function reachedPastReports() {
	let data = userData;
	data.reports.forEach(function(report, index, reportArr) {
		for (bike of data.bikes) {
			if (bike.serial === report.serial) {
				reportArr[index].bike = bike;
			}
		}
	})
	insertTemplate(data, "#reports-content", "#past-reports-container");
}

//TODO: Lots of repeat between here and the function above
function reachedReports() {
	let data = userData;
	data.reports.forEach(function(report, index, reportArr) {
		for (bike of data.bikes) {
			if (bike.serial === report.serial) {
				reportArr[index].bike = bike;
			}
		}
	})
	insertTemplate(data, "#reports-content", "#reports-container");
	insertTemplate(userData, "#report-a-bike-content", "#report-a-bike-container");
}


function reachedReport() {
	let data = null;
	if (sessionStorage.newReportSerial) {
		data={serial: sessionStorage.newReportSerial};
		sessionStorage.removeItem("newReportSerial");
	}
	insertTemplate(data, "#report-content", "#report-container");
}


function reachedEditReport() {
	for (report of userData.reports) {
		if (report.reportID === sessionStorage.reportID) {
			insertTemplate(report, "#report-content", "#edit-report-container");
		}
	}
}

function reachedUnregister() {
	if (sessionStorage.serial && sessionStorage.model) {
		insertTemplate({serial: sessionStorage.serial, model:sessionStorage.model}, "#unregister-content", "#unregister-container");
	}
}

function reachedProfile() {
	let profileData = userData.profile;
	Object.assign(profileData, userData.privacy);
	insertTemplate(profileData, "#profile-content", "#profile-container");
}

function reachedMyBikes() {
	insertTemplate(userData, "#my-bikes-content", "#my-bikes-container");
}

function reachedLookup() {
	//TODO: When we're actually searching, this won't be the user's own data.
	// It will be the bike who's searial number matches
	const privacy = getPrivacySetting(userData.bikes[1], userData.privacy); //TODO: Use the other person's
	if (privacy === -1) {
		insertTemplate(null, "#lookup-not-found", "#lookup-container");
	} else {
		const data = {privacy: privacy, owner: userData.profile, report: userData.reports[0], bike: userData.bikes[0]};//TODO: Take this line out later, replace w. database call
		insertTemplate(data, "#lookup-content", "#lookup-container");
	}
}








  ///////////////////////////////////////////
 ////		toNewPage FUNCTIONS			////
///////////////////////////////////////////

// These functions specify what values you should save into 
// session storage before going to each page


//Switch to the given page of the app
function goSomewhere(screen) {
	$.mobile.pageContainer.pagecontainer("change", screen);
}


//TODO: Reuse code here
function toBikeDetail(serial) {
	if(typeof(Storage) != "undefined") {
  		sessionStorage.serial=serial;
  	}
	goSomewhere("#bike-detail");
}

function toReport(serial) {
	if(typeof(Storage) != "undefined") {
  		sessionStorage.newReportSerial = serial;
  	}
	goSomewhere("#report");
}


function toEditReport(id) {
	if(typeof(Storage) != "undefined") {
  		sessionStorage.reportID = id;
  	}
	goSomewhere("#edit-report");
}


function toUnregister(serial, model) {
	sessionStorage.serial = serial;
	sessionStorage.model = model;
	goSomewhere('#unregister');
}







  ///////////////////////////////////////////
 ////		HANDLEBARS HELPERS			////
///////////////////////////////////////////




//Only show element if 2 params are ===
Handlebars.registerHelper('IF', function(var1, operator, var2, options) {
	switch(operator) {
		case "===":
			return (var1 === var2) ? options.fn(this) : null;
			//If we need more operations, add them
		case "!=":
			return (var1 != var2) ? options.fn(this) : null;
		case ">=":
			return (var1 >= var2) ? options.fn(this) : null;
		default:
			return null;
	}
})


//Converts a word to all lowercase
Handlebars.registerHelper('lowercase', function(word) {
	return word.toLowerCase();
});


// Reads params for whether the owner and/or police should be contacted if the bike is recovered
// Formats them into a string for the report log
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



  ///////////////////////////////////////////
 ////	  MISCELLANEOUS FUNCTIONS		////
///////////////////////////////////////////



//Open the terms of service for people to read
function showTerms() {
	cordova.InAppBrowser.open("https://skylusteam.github.io/BikeNab/www/Terms-of-service.pdf", '_blank');
}


//Return the relevant privacy setting (-1, 0, 1, or 2), taking into account
// 		a) Is the person police?
//		b) Owner's listed privacy settings
//		c) Bike's status (stolen or okay)
function getPrivacySetting(bike, privacy) {
	const stolen = (bike.status === "Missing" || bike.status === "Stolen");
	if(stolen) {
		if (userData.police) {
			return privacy.policeSearchStolen;
		} else {
			return privacy.individualSearchStolen;
		}
	} else {
		if (userData.police) {
			return privacy.policeSearchNormal;
		} else {
			return -1; //Individuals can't see unstolen bikes.
		}
	}
}