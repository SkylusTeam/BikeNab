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

// Object.prototype.getName = function() {
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
// };



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

var userData = normalData;

var loadedUser;
var loadedBikes;
var loadedReports;



  ///////////////////////////////////////
 ////		SETUP FUNCTIONS			////
///////////////////////////////////////


// When the app first loads, insert templates for repeated elements
// (such as headers) in the correct locations.
$( document ).ready(function() {
	addRepeatedElements();

     $(document).on('change',  function(e) {
      var target = e.target;
      if ($(e.target).attr('type') == 'file') {
        var pic = $(target).parent().prev();
        var file = e.target.files[0];
        pic.attr('src', URL.createObjectURL(file));
      }
    });


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

  //If browser, replace app photos with browser photos
  // if (!isApp()) { //TODO: Should this be isApp or isMobile???
  //   var browserFile = '<input id="testPicInput" class="blue-button medium-button browser-file" type="file" accept="image/*"}>';
  //   $(".photo-button").replaceWith(browserFile);
  //   $(".photo-button").fieldcontain();
  // }
}


//Phonegap Stuff - make things look/act different depending on the platfom
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	addMenu(isApp());
//	braintreeStuff();
}


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
			return loadUser(reachedReports);
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
			return;
	}
});



//TODO: Can we reuse code among any of these?

function insertTemplate(data, templateName, containerID) {
	let template = Handlebars.templates[templateName];
	console.log(templateName);
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

	var serial = sessionStorage.serial;
	console.log(serial+ " --- rbd serial");
	var currBike;
	var getBike = firebase.database().ref('/bikes/'+serial);
	getBike.on("value", function(theBike) {
		console.log(theBike.val());
		console.log("waited for bike val rbd")
		currBike = theBike.val();
		console.log("should have bikeval rbd")
		if (currBike) {
			//If it's your bike, have a parameter that says that
			if(currBike.ownerid == firebase.auth().currentUser.uid) //could be a one liner
				currBike.mine = true;
			else
				currBike.mine = false;

			insertTemplate(currBike, "bikeDetail", "#bike-detail-container");
		}
	})

}


function reachedEditBikeInfo() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === sessionStorage.serial) {
      bike.app = isApp();
			insertTemplate(bike, "bikeInfo", "#edit-bike-info-container");
		}
	}
}


function reachedRegisterBike() {
	insertTemplate(null, "bikeInfo", "#register-bike-info-container");
}


function reachedPastReports() {
	var data = loadedReports;
	console.log('past loaded rep');
	console.log(data)
	//fairly confident this does nothing
	/*
	data.reports.forEach(function(report, index, reportArr) {
		for (bike of data.bikes) {
			if (bike.serial === report.serial) {
				reportArr[index].bike = bike;
			}
		}
	})
	*/
	insertTemplate(data, "reports", "#past-reports-container");
}

//TODO: Lots of repeat between here and the function above
function reachedReports() {
	var data = loadedUser;
	console.log(loadedReports);

	if (loadedReports) {
		data.reports = loadedReports.reports;
		console.log(' loaded reports load');
		console.log(data)

		/*data.reports.forEach(function(report, index, reportArr) {
			for (bike of data.bikes) {
				if (bike.serial === report.serial) {
					reportArr[index].bike = bike;
				}
			}
		}) */
		insertTemplate(data, "reports", "#reports-container");
		insertTemplate(userData, "reportABike", "#report-a-bike-container");
	} else {
		var user = firebase.auth().currentUser;
		var userId = user.uid;
		var reports = firebase.database().ref('/users/' + userId+'/reports');
		console.log('active report load');
		var reportDict = {reports:[]};
		console.log(reports);
		if (reports) {
			reports.on("value", function(snapshot) {
			   console.log(snapshot.val());
			   if(snapshot.val()) {
				   jQuery.each(snapshot.val(), function() {
				   		console.log('getting report');
						console.log(this.toString())
						var getReport = firebase.database().ref('/reports/'+this.toString());
						getReport.on("value", function(theReport) {
							console.log('report value:')
							console.log(theReport.val());
							reportDict["reports"].push( theReport.val());
						});
					});
				}
				data.reports = reportDict
				console.log(data);
				insertTemplate(data, "reports", "#reports-container");
				insertTemplate(userData, "reportABike", "#report-a-bike-container");
			}, function (error) {
			   console.log("Error: " + error.code);
			});

		}
	}

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
	insertTemplate({serial: sessionStorage.serial , model:sessionStorage.model}, "unregister", "#unregister-container");
}

function reachedProfile() {
	//let profileData = userData.profile;
	//Object.assign(profileData, userData.privacy);
	//console.log(profileData);
	var profileData = loadedUser;
	console.log(loadedUser);
	insertTemplate(profileData, "profile", "#profile-container");
}

function reachedMyBikes() {
	var user = firebase.auth().currentUser;

	if (user) {
		var userId = user.uid;
		bikeDict = loadedBikes;
      console.log("Bike dict");
      console.log(bikeDict);
		insertTemplate(bikeDict, "myBikes", "#my-bikes-container");
		} else {
			insertTemplate(userData, "myBikes", "#my-bikes-container");
		}
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
	console.log(userData.profile)
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
	if(page=='#home') {
		if(firebase.auth().currentUser && !loadedBikes) {

      	loadedUser = initProfile();
      	myBikes();
      	loadedReports = loadReports();
      	console.log('had to reget the loaded info');
		}
	}
	if (userData.police && lePage) {
		$.mobile.pageContainer.pagecontainer("change", lePage, {});
	} else {
		$.mobile.pageContainer.pagecontainer("change", page, {});
	}
}


//TODO: Reuse code here
function toBikeDetail(serial) {
	if(typeof(Storage) != "undefined") {
		sessionStorage.serial=serial;
		console.log("serial passed to bike detail: "+ serial)
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


///////////////////////////


//var id = "please"

function takePhoto (id) {
  if (!isMobile()) {
    alert("not mobile case");
    //Only open file system
    if (!navigator.camera) {
      alert("Error - camera not supported (browser).");
    }
  } else {
    // Option for either
    if (!navigator.camera) {
      alert("Error - camera not supported!");
    } else {

      function onSuccess(img) {
          $("#" + id).attr('src', "data:image/jpeg;base64," + img);
      }


      var options =   {   quality: 50,
                          destinationType: Camera.DestinationType.DATA_URL, //TODO: Which is best?
                          sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                          encodingType: 0     // 0=JPG 1=PNG
                      };
      navigator.camera.getPicture(
        onSuccess,
        onError, options);
      }
    }
  }



function onError(message) {
  alert("Uh oh! " + message);
}



this.changePicture = function(event) {
    event.preventDefault();
    if (!navigator.camera) {
        app.showAlert("Camera API not supported", "Error");
        return;
    }
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };

    navigator.camera.getPicture(
        function(imageData) {
            $('#image').attr('src', "data:image/jpeg;base64," + imageData);
        },
        function() {
            alert('Error taking picture');
        },
        options);

    return false;
};




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
	return hi;
}


function followUnfollow(reportID, following) {
	//TODO: Make this function change something in the user's list of followed reports.
}


function testCreate() {
	//database.ref('meow').set({serial: $("#serial-number").val()	});
	var email = $('#email').val();
    var password = $('#password1').val();
    var password2 = $('#password2').val();
    /*
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      */
      if (password != password2) {
        alert('Passwords do not match');
        return;
      }
      /*
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      */
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      	var user = firebase.auth().currentUser;
      	console.log('tried to send sendEmailVerification')
		user.sendEmailVerification().then(function() {
 			 // Email sent.
 			 	console.log('sent sendEmailVerification')
			}, function(error) {
				console.log('failed to send sendEmailVerification')
  			// An error happened.
			});
		firebase.database().ref('users/' + user.uid).update({
		    email:email
			});
     	}

      	, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
	goSomewhere("#home");
} ;


function leCreate() {
	//database.ref('meow').set({serial: $("#serial-number").val()	});
	var email = $('#email').val();
    var password = $('#password1').val();
    var password2 = $('#password2').val();
    var leName = $('#le-name').val();
    var leDep = $('#le-department').val();
    var deZip = $('#le-dept-zip').val();
    var wEmail = $('#le-email').val();
    var wLandline = $('#le-work-phone').val();
    var wCell = $('#le-cell').val();
    var wSocial = $('#le-social-media').val();
    /*
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      */
      if (password != password2) {
        alert('Passwords do not match');
        return;
      }
      /*
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      */
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      	var user = firebase.auth().currentUser;
      	console.log('tried to send sendEmailVerification')
		user.sendEmailVerification().then(function() {
 			 // Email sent.
 			 	console.log('sent sendEmailVerification')
			}, function(error) {
				console.log('failed to send sendEmailVerification')
  			// An error happened.
			});
		firebase.database().ref('users/' + user.uid).update({
		    name: leName,
		    department: leDep,
		    departmentZip: deZip,
		    workEmail: wEmail,
		    workLandline:wLandline,
		    workSocialMedia: wSocial,
		    workCell: wCell,
		    email:email
			});
     	}

      	, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
	goSomewhere("#home");
} ;

function signOut() {
	firebase.auth().signOut().then(function(){goSomewhere('#login');})
}


function signIn() {
      if (firebase.auth().currentUser) {
        goSomewhere('#home');
      	console.log('already logged in?, fix this from working')
      } else {
        var email = $('#loginemail').val();
        var password = $('#loginpassword').val();
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          if(error){
          	console.log('error happened');
          }
          // [END_EXCLUDE]
        }).then(function(){
      	var user = firebase.auth().currentUser;
      	console.log(user.email);
      	loadedUser = initProfile();
      	myBikes();
      	loadedReports = loadReports();
      	console.log('done loading');
      	goSomewhere('#home');
      });
        // [END authwithemail]
      }
      console.log('attempted login');

    };

function loadReports(){
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var reports = firebase.database().ref('/users/' + userId+'/reports');
	console.log('lr user');
	var reportDict = {reports:[]};
	console.log(reports);
	if (reports) {
		reports.on("value", function(snapshot) {
		   console.log(snapshot.val());
		   if(snapshot.val()) {
			   jQuery.each(snapshot.val(), function() {
			   		console.log('getting report');
					console.log(this.toString())
					var getReport = firebase.database().ref('/reports/'+this.toString());
					getReport.on("value", function(theReport) {
						console.log('report value:')
						console.log(theReport.val());
						reportDict["reports"].push( theReport.val());
					});
				});
			}
		}, function (error) {
		   console.log("Error: " + error.code);
		});
	}
	console.log('report dict');
	console.log(reportDict);
	return reportDict;
}

function registerBike(){
	var appcode = $('#app-code').val();
	var dbAppcode = firebase.database().ref("appcodes/"+appcode);
	dbAppcode.once("value", function(snapshot){
		console.log(snapshot.val())
	});
	var serial = $('#serial-number').val();
    var make = $('#bike-make').val();
    var model = $('#bike-model').val();
    var year = $('#bike-year').val();
    var place = $('#bike-purchase-place').val();
    var cost = $('#bike-cost').val();
    var info = $('#additional-info').val();
    var bikeOwnerPic = $('#bikeOwnerPic').attr('src');
    var bikePic = $('#bikePic').attr('src');
    var bikeSerialPic = $('#bikeSerialPic').attr('src');
    var receiptPic = $('#receiptPic').attr('src');
    var pics = [[bikeOwnerPic,"bikeOwnerPic"],
                [bikePic, "bikePic"],
                [bikeSerialPic,"bikeSerialPic"],
                [receiptPic,"receiptPic"]];

    var user = firebase.auth().currentUser;
    var userId = user.uid;

    //not sure I want to wait for this or not...
    //firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  	//	var ownerName = snapshot.val().name; });
	if (user) {
		// User is signed in.
			//should probably have firebase security check this

	    var userId = user.uid;

	    console.log("PICS!!!");
	    console.log(pics);
	    console.log($('#receiptPic'));
	    for (var picList of pics) {
	      pic = picList[0]
	      console.log("PIC IS", pic, "ya");
	      console.log(Object.prototype.toString.call(pic));
	      if (pic != undefined) {
	        console.log("TYPE, ", pic);
	        firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picList[1]).putString(pic).then(
	            function(snapshot) {
	              console.log("It's working people!!!");
	              console.log(snapshot);
	            }
	        );
	      }
	    }
	    if(serial) {
	    		console.log(appcode + ", " + serial)
				firebase.database().ref('bikes/' + serial).set({
					make: make,
					model: model,
					otherInfo: info,
					purchasePlace: place,
					serial:serial,
					status: "okay",
					value: cost,
					year: year,
					ownerid: userId,
					owneremail: user.email,
					appcode:appcode

					}).then(function() {
					    firebase.database().ref('users/' + userId).child("bikes").push({
				    		serial:serial
				  }).then(function() {myBikes();}).then(function(){
				  	firebase.database().ref('appcodes/' + appcode).set({
					status:"used",
					owner:user.email,
					bike:serial

					})
				  });
					}, function(error) {
					});
			}
    } else {
	// No user is signed in.
	console.log("no user signed in on bike registration");
	}
}


function updateProfile(){
	//This relies on the fields being prefilled with original values, otherwise it could delete everything
	var contact = $('#contact-name').val();
    var backupEmail = $('#backupEmail').val(); //TODO convert to dashed style?
    var birthdate = $('#birthdate').val();
    var address = $('#address').val();
    var cell = $('#cell').val();
    var socialMedia = $('#social-media').val();

    var indStolen = $('#ind-stolen').val();
    var leNormal = $('#le-normal').val();
    var leStolen = $('#le-stolen').val();
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).update({
		    name: contact,
		    backupEmail: backupEmail,
		    birthdate: birthdate,
		    address: address,
		    cellphone: cell,
		    socialMedia: socialMedia,
		    indStolen: indStolen,
		    leNormal: leNormal,
		    leStolen: leStolen
		  }).then(function() {loadedUser = initProfile()});


}

function makeReport() {
//need to change the id's of the fields

	var user = firebase.auth().currentUser;
	console.log('report');
	var reportSerial = $('#report-serial').val();
	var officerName = $('#officer-name').val();
	var officerEmail = $('#officer-email').val();
	var officerPhone = $('#officer-phone').val();
	var incidentReport = $('#additional-info').val(); //missing stolen may be better as dragdown?
	var contactle = false;
	var contactme = false;
	$( "input[type=checkbox]:checked" ).each(function() {
		if("contact-me"==$(this).val())
			contactme = true;
		if("contact-police"==$(this).val())
			contactle = true;
	} );

	var level = $( "input[type=checkbox]" ) .val();

	var d = new Date();
	var seconds = Math.round(d.getTime() / 1000);

	var reportData = {
		serial : reportSerial,
		officerName : officerName,
		officerEmail : officerEmail,
		officerPhone : officerPhone,
		incidentReport : incidentReport, //missing stolen may be better as dragdown?
		incidentNumber : 'Waiting for an incident number',
		contactOwner : contactme,
		contactLaw : contactle,
		date : seconds,
		reportID : 'fakereportid',
		status : level

		}
	var reportKey = firebase.database().ref().child('reports').push().key;
	var updates = {};
	firebase.database().ref('/users/'+user.uid+'/reports/').push(reportKey);
	updates['/reports/'+reportKey] = reportData;
	if(reportSerial) {
		firebase.database().ref('/bikes/'+reportSerial).update({status:level});
		firebase.database().ref('/bikes/'+reportSerial+"/reports/").push({serial:reportKey});
	}
	 return firebase.database().ref().update(updates);
}

//http://deepliquid.com/content/Jcrop_Manual.html

function cropBoxSetup(totalWidth) {
	$('#test-pic').Jcrop({
		setSelect:   [ 0, 0, 160, 90 ],
		aspectRatio: 16 / 9,
		boxWidth: Math.round(totalWidth * .85),
		onSelect: updatePic
	},function(){
		// Use the API to get the real image size
		var bounds = this.getBounds();
		boundx = bounds[0];
		boundy = bounds[1];
	});
}

var boundx, boundy

function setUpPhotoCrop() {
	let totalWidth = $('[data-role="page"]').first().width();
	$('#test-popup').width(totalWidth * .9);
	cropBoxSetup(totalWidth);
}


function updatePic(c) {
	let xsize =  $("#test-container").width();
	let ysize =  $("#test-container").height();
	var rx = xsize / c.w;
	var ry = ysize / c.h;
	$("#test-pic-cropped").css({
		width: Math.round(rx * boundx) + 'px',
		height: Math.round(ry * boundy) + 'px',
		marginLeft: '-' + Math.round(rx * c.x) + 'px',
		marginTop: '-' + Math.round(ry * c.y) + 'px'
	});
}

function myBikes() {
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var bikes = firebase.database().ref('/users/' + userId+'/bikes');
	var bikeDict = {bikes:[]};
	if (bikes) {
		bikes.on("value", function(snapshot) {
			bikeDict = {bikes:[]};
		    if (snapshot.val()) {
		   		jQuery.each(snapshot.val(), function() {
                  var getBike = firebase.database().ref('/bikes/'+this.serial);
                  getBike.once("value", function(theBike) {
                     console.log("HERE's THE BIKE!");
                     var bikeData = theBike.val();
                     console.log(bikeData);
                     console.log(bikeData.serial);
                     //Get images
                     var imagePath = firebase.storage().ref('/users/' + userId + '/bikes/' + bikeData.serial);
                     imagePath.child('bikeOwnerPic').getDownloadURL().then(function(url) {
                        //alert("Getting pic from + imagePath");
                        bikeData.bikeOwnerPic = url;
                     });
                     imagePath.child('bikePic').getDownloadURL().then(function(url) {
                        bikeData.bikePic = url;
                     });
                     imagePath.child('bikeSerialPic').getDownloadURL().then(function(url) {
                        bikeData.bikeSerialPic = url;
                     });
                     imagePath.child('receiptPic').getDownloadURL().then(function(url) {
                        bikeData.receiptPic = url;
                     });
                     bikeDict["bikes"].push(bikeData);
                  });

				});
		}
		loadedBikes = bikeDict;
		}, function (error) {
		   console.log("Error: " + error.code);
		});
	}
}

function initProfile() {
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var prof = firebase.database().ref('/users/' + userId)

	prof.on("value", function(snapshot) {
	   	if(snapshot.val()) {
	   		loadedUser = snapshot.val();
		}

	});
}

function loadUser(callback) {
	if (loadedUser) {
		console.log("already was loaded user")
		console.log(loadedUser)
		if(typeof callback === "function") {
			callback();
		}

	}
	else{
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var prof = firebase.database().ref('/users/' + userId)

	prof.on("value", function(snapshot) {
		console.log('snapshotting');
	   	console.log(snapshot.val());
	   	if(snapshot.val()) {
	   		loadedUser = snapshot.val();

			console.log("new loaded user")
			console.log(loadedUser)
	   		callback();
		}

	});
	}
}

jQuery(function($) {
	setUpPhotoCrop();
});



function closePopup(popup) {
	$("#" + popup).popup("close");
}


$( window ).resize(function() {
	//Anything window-size-dependent changes here!
	setUpPhotoCrop();
});

function searchSerial() {
	var searchId = $('#serialSearch').val();
	console.log(searchId);
	var bikeDict = {};
	var getBike = firebase.database().ref('/bikes/'+searchId);
			getBike.on("value", function(theBike) {
				console.log(theBike.val());
				bikeDict["bike"] = ( theBike.val());
				if(theBike.val()) {
					console.log("found bike")
					console.log(bikeDict);
					insertTemplate(bikeDict, "lookup", "#lookup-container");
				} else {
					console.log("no bike found")
					insertTemplate({},"noSerial","#lookup-container")
				}
			});

};

// // TESTING PIßC UPLOADING
// $("#testPicInput").attr()

// function showPic(e, pic) {
//   console.log("FUNCTION IS BEING CALLED!!!!!");
//   //console.log(fileName);
//   var file = e.target.file;
//   console.log("FILE: ", file);
// //  console.log("FILE TYPE ", type(file));
//   // var reader = new FileReader();
//   // reader.onload = (function(file) {
//   //   console.log("I think it's working!");
//   //   $("#" + pic).attr('src', 'canyon.jpg');
//   // })
//   // reader.readAsDataURL(file);
// }



//sass --watch scss:cs

//cd into www
//handlebars -m js/templates/> js/templates/templates.js
