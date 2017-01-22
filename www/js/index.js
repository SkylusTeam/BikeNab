// SOMETHING USEFUL ABOUT ADDING PLUGINS AND STUFF
// http://stackoverflow.com/questions/29970885/cordova-5-0-0-which-files-should-i-commit-to-git

  ///////////////////////////////////////
 ////			TEMPORARY			////
///////////////////////////////////////


// $(function() {
// 	$("form[name='register-bike']").validate({
// 		rules: {
// 			"serial-number": "required",
// 		},
// 		messages: {
// 			"serial-number": "Required"
// 		}
// 	});

// 	$("form[name='report-bike']").validate({
// 		rules: {
// 			"serial": "required",
// 			"bike-status": "required"
// 		},
// 		messages: {
// 			"serial": "Required",
// 			"bike-status": "Required"
// 		}
// 	});
// });





//TEST USER: Delete this when we have actual data

let testUser = '{' +
'"profile": {' +
// '	"name": "myname",' +
 '	"email": "myemail"' +
// '	"backupEmail": "mybackupemail",' +
// '	"birthdate": "mybirthdate",' +
// '	"address": "myaddress",' +
// '	"cellphone": "mycellphone",' +
// '	"socialMedia": "mysocialMedia"' +
'},' +
'"bikes": [' +
'	{' +
'		"serial": "mySerial",' +
//'		"make": "myMake" ,'+
//'		"model": "myModel", ' +
//'		"year": "myYear", '  +
// '		"purchasePlace": "mypurchasePlace", '+
// '		"value": "myValue", '  +
// '		"otherInfo": "myOtherInfo", ' +
 '		"status": "Okay"' +
'	}' +
// '	{' +
// '		"serial": "12321",' +
// '		"make": "coolBike" ,'+
// '		"model": "reallycool", ' +
// '		"year": "myYear", '  +
// '		"purchasePlace": "mypurchasePlace", '+
// '		"value": "myValue", '  +
// '		"otherInfo": "myOtherInfo", ' +
// '		"status": "Stolen"' +
// '	}' +
'],' +
'"reports": [' +
'	{' +
//'		"reportID": "myReport", ' +
'		"serial": "mySerial", ' +
// '		"incidentNumber": "myIncidentNumber", ' +
// '		"officerName": "myOfficerName", ' +
// '		"officerEmail": "myOfficerEmail", ' +
// '		"officerPhone": "myOfficerPhone", ' +
// '		"description": "myDescription", ' +
 '		"status": "Stolen",' +
// '		"contactOwner": true,' +
// '		"contactPolice": true,' +
 '		"date": "myDate" ' +
'	}' +
'],' +
// '"privacy": {' +
// '		"individualSearchStolen": 0, ' +
// '		"policeSearchNormal": 1, ' +
// '		"policeSearchStolen": 2 ' +
// '},' +
'"police": false' +
'}'


let testCop = '{' +
'"profile": {' +
'	"name": "myname",' +
'	"email": "myEmail@gmail.com",' +
'	"department": "myDept",' +
'	"zip": "myZip",' +
'	"workEmail": "myWorkEmail",' +
'	"workPhone": "myPhone",' +
'	"workCell": "myCell",' +
'	"workSocialMedia": "mysocialMedia"' +
'},' +
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
'		"date": "myDate", ' +
'		"bikeInfo":	{' +
'			"serial": "mySerial",' +
'			"make": "myMake" ,'+
'			"model": "myModel", ' +
'			"year": "myYear", '  +
'			"purchasePlace": "mypurchasePlace", '+
'			"value": "myValue", '  +
'			"otherInfo": "myOtherInfo", ' +
'			"status": "Okay"' +
'		}' +
'	}' +
'],' +
'"privacy": {' +
'		"individualSearchStolen": 0, ' +
'		"policeSearchNormal": 1, ' +
'		"policeSearchStolen": 2 ' +
'},' +
'"police": true' +
'}'

//TODO: Add back in images

var normalData = JSON.parse(testUser);
var policeData = JSON.parse(testCop);

// var imageData = file_get_contents("img/canyon.jpg");
// imageData = base64_encode(imagedata);
// console.log("image data");
// console.log(imageData);
// for (let i = 0; i < normalData.bikes.length; i++) {
// 	normalData.bikes[i].image = imageData;
// }
// for (let i = 0; i < policeData.bikes.length; i++) {
// 	policeData.bikes[i].image = imageData;
// }

var userData = normalData;



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

	let headerTemplate = Handlebars.templates["header"];
	$("#header-container").html(headerTemplate({police: userData.police}));
	$("#header-container").enhanceWithin();


	//Insert large sections of code which are used in multiple places.
	//TODO: Do we need this anymore?
	insertSections();

	// Format floating white box.
	console.log("repeated elements being added");
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
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("")
	addMenu(isApp());
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
	//$('[data-role="header"]').removeClass('invisible');
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
			return reachedBikeDetail();
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
		case 'contact':
			return reachedContact();
		case 'settings':
			return reachedSettings();
		case 'le-create-account':
			return reachedLeCreateAccount();
		case 'create-account':
			return reachedCreateAccount();
		case 'le-profile':
			return reachedLeProfile();
		case 'home':
			return reachedHome();
		case 'le-reports':
			return reachedLeReports();
		default:
			console.log("You'd better do " + data.toPage[0].id);
	}
});



//TODO: Can we reuse code among any of these?

function insertTemplate(data, templateName, containerID) {
	let template = Handlebars.templates[templateName];
	console.log("here's the template! " + containerID);
	console.log($(containerID).html());
	$(containerID).html(template(data));
	$(containerID).enhanceWithin();
}


function reachedLeReports() {
	insertTemplate({reports: userData.reports, following: false}, "leReports", "#le-reports-container");
	insertTemplate({reports: userData.reports, following: true}, "leReports", "#le-area-reports-container");
}


function reachedHome() {
	insertTemplate({police: userData.police}, "home", "#home-container");
}


function reachedBikeDetail() {
	let currBike = null;
	if (userData.police) {
		//TODO: Decide on the best place to save the bike object we get below.
		// Inside the report?
		// Lookup?
		currBike = normalData.bikes[0];
	} else {
		let bikesList = userData.bikes;
		for (let bike of bikesList) {
			if (bike.serial === sessionStorage.serial) {
				currBike = bike;
			}
		}
	}
	if (currBike) {
		//If it's your bike, have a parameter that says that
		currBike.mine = false;
		if (userData.bikes) {
			for (let bike of userData.bikes) {
				if (bike.serial === currBike.serial) {
					currBike.mine = true;
				}
			}
		}
		insertTemplate(currBike, "bikeDetail", "#bike-detail-container");
	}
}


function reachedEditBikeInfo() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === sessionStorage.serial) {
			insertTemplate(bike, "bikeInfo", "#edit-bike-info-container");
		}
	}
}


function reachedRegisterBike() {
	insertTemplate(null, "bikeInfo", "#register-bike-info-container");
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
	insertTemplate(data, "reports", "#past-reports-container");
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
	insertTemplate(data, "reports", "#reports-container");
	insertTemplate(userData, "reportABike", "#report-a-bike-container");
}


function reachedReport() {
	let data = null;
	if (sessionStorage.newReportSerial) {
		data={serial: sessionStorage.newReportSerial};
		sessionStorage.removeItem("newReportSerial");
	}
	insertTemplate(data, "report", "#report-container");
}


function reachedEditReport() {
	for (report of userData.reports) {
		if (report.reportID === sessionStorage.reportID) {
			insertTemplate(report, "report", "#edit-report-container");
		}
	}
}

function reachedUnregister() {
	console.log("reached unregister: " + sessionStorage.model);
	console.log(sessionStorage.model === "");
	insertTemplate({serial: sessionStorage.serial , model:sessionStorage.model}, "unregister", "#unregister-container");
}

function reachedProfile() {
	let profileData = userData.profile;
	Object.assign(profileData, userData.privacy);
	insertTemplate(profileData, "profile", "#profile-container");
}

function reachedMyBikes() {
	insertTemplate(userData, "myBikes", "#my-bikes-container");
}

function reachedLookup() {
	//TODO: When we're actually searching, this won't be the user's own data.
	// It will be the bike who's searial number matches
	const privacy = getPrivacySetting(normalData.bikes[0], normalData.privacy); //TODO: Use the other person's
	if (privacy === -1) {
		insertTemplate(null, "lookup", "#lookup-container");
	} else {
		const data = {privacy: privacy, owner: normalData.profile, report: normalData.reports[0], bike: normalData.bikes[0]};//TODO: Take this line out later, replace w. database call
		insertTemplate(data, "lookup", "#lookup-container");
	}
}

function reachedContact() {
	insertTemplate(userData.profile, "contact", "#contact-container");
}

function reachedSettings() {
	insertTemplate(userData, "settings", "#settings-container");
}

function reachedLeCreateAccount() {
	insertTemplate(null, "createAccount", "#le-create-account-container");
	insertTemplate(null, "lePersonal", "#le-personal-create-container");
}

function reachedLeProfile() {
	insertTemplate(userData.profile, "lePersonal", "#le-personal-profile-container");
}

function reachedCreateAccount() {
	insertTemplate(null, "createAccount", "#create-account-container");
}



  ///////////////////////////////////////////
 ////		toNewPage FUNCTIONS			////
///////////////////////////////////////////

// These functions specify what values you should save into 
// session storage before going to each page


//Switch to the given page of the app
function goSomewhere(page, lePage) {
	if (userData.police && lePage) {
		console.log("First case");
		$.mobile.pageContainer.pagecontainer("change", lePage, {});
	} else {
		console.log("second case");
		$.mobile.pageContainer.pagecontainer("change", page, {});
	}
}


//TODO: Reuse code here
function toBikeDetail(serial) {
	if(typeof(Storage) != "undefined") {
		sessionStorage.serial=serial;
	} //TODO: Where should we store LE data?
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


Handlebars.registerHelper('no', function(condition, text) {
	if (condition === undefined || condition === "") {
		return text;
	} else {
		return;
	}
});


Handlebars.registerHelper('exists', function(condition, text) {
	if (condition !== undefined || condition === "") {
		return;
	} else {
		return text;
	}
});


// Handlebars.registerHelper('exists', function(condition, text) {
// 	if (condition !== undefined) {
// 		return;
// 	} else {
// 		return text;
// 	}
// });


//Converts a word to all lowercase
Handlebars.registerHelper('lowercase', function(word) {
	return word.toLowerCase();
});


//Makes the first letter of the word capital
Handlebars.registerHelper('capitalize', function(word) {
	if (!word) {
		return "";
	}
	return word.charAt(0).toUpperCase() + word.slice(1);
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
	cordova.InAppBrowser.open("Terms-of-service.pdf");
	//For whatever reason, the terms don't show up correctly on mobile browsers if you try to open them in the same page.
	//TODO: Check whether this is universal or just my data.
	// if (!isApp() && isMobile()){
	// 	cordova.InAppBrowser.open("https://skylusteam.github.io/BikeNab/www/Terms-of-service.pdf");
	// } else {
	// 	cordova.InAppBrowser.open("https://skylusteam.github.io/BikeNab/www/Terms-of-service.pdf", '_blank');
	// }
}


//Return the relevant privacy setting (-1, 0, 1, or 2), taking into account
// 		a) Is the person police?
//		b) Owner's listed privacy settings
//		c) Bike's status (stolen or okay)
function getPrivacySetting(bike, privacy) {
	console.log(bike);
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


function isMobile() {
	//Taken here: http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
	//This method differenetiates between desktop and mobile (so mobile browsers and apps count as the same)
	return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
}


function isApp() {
	//Taken here: //http://damien.antipa.at/blog/2014/02/08/3-ways-to-detect-that-your-application-is-running-in-cordova-slash-phonegap/
	//This method differenetiates between apps & browsers (so mobile & desktop browsers count as the same)
	//Useful for menus (deciding whether or not we want a back button)
	let hi = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
	if (hi) {
		alert("hi we're in trouble");
	}
	return hi;
}


function followUnfollow(reportID, following) {
	//TODO: Make this function change something in the user's list of followed reports.
}


function testSubmit() {
	console.log("hi");
	console.log($("#serial-number").val());
	database.ref('meow').set({
		serial: $("#serial-number").val()
	});

	goSomewhere("#home");

	return false;
} 






//cd into www
//handlebars -m js/templates/> js/templates/templates.js

