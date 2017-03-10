// SOMETHING USEFUL ABOUT ADDING PLUGINS AND STUFF
// http://stackoverflow.com/questions/29970885/cordova-5-0-0-which-files-should-i-commit-to-git

var loadedUser;
var loadedBikes;
var loadedReports;

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

var normalData = JSON.parse(testUser);
var userData = normalData;


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
		user.sendEmailVerification().then(function() {
		 // Email sent.
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
		console.log(error.code);
		// [END_EXCLUDE]
	});
	// [END createwithemail]
	goSomewhere("#home");
} ;


function leCreate() {
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
		user.sendEmailVerification().then(function() {
			 // Email sent.
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
		console.log(error.code);
		// [END_EXCLUDE]
	});
	// [END createwithemail]
	goSomewhere("#home");
};

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
			loadedUser = initProfile();
			myBikes();
			loadedReports = loadReports();
			goSomewhere('#home');
		});
		// [END authwithemail]
		}
	};

function loadReports(){
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var reports = firebase.database().ref('/users/' + userId+'/reports');
	var reportDict = {reports:[]};
	if (reports) {
		reports.on("value", function(snapshot) {
			if(snapshot.val()) {
				jQuery.each(snapshot.val(), function() {
					var getReport = firebase.database().ref('/reports/'+this.toString());
					getReport.on("value", function(theReport) {
						reportDict["reports"].push( theReport.val());
					});
				});
			}
		}, function (error) {
			console.log("Error: " + error.code);
		});
	}
	return reportDict;
}

function registerBike(){

	var user = firebase.auth().currentUser;
	var userId = user.uid;
	if (user) {

	var serial = $('#serial-number').val();

	if (serial) { // If the serial number is blank, don't register bike
		var appcode = $('#app-code').val();
	
		// Text-based fields
		var make = $('#bike-make').val();
		var model = $('#bike-model').val();
		var year = $('#bike-year').val();
		var place = $('#bike-purchase-place').val();
		var cost = $('#bike-cost').val();
		var info = $('#additional-info').val();

		// Image fields
		var bikeFile = document.getElementById('bikeButton').files[0];
		var bikeOwnerFile = document.getElementById('bikeOwnerButton').files[0];
		var bikeSerialFile = document.getElementById('bikeSerialButton').files[0];
		var receiptFile = document.getElementById('receiptButton').files[0];
		var pics = [[bikeFile,'bikePic'], 
					[bikeOwnerFile, 'bikeOwnerPic'], 
					[bikeSerialFile, 'bikeSerialPic'], 
					[receiptFile,'receiptPic']];

		// Store pics in firebase
		for (pic of pics) {
			if (pic[0]) {
				firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + pic[1]).put(pic[0]);
			}
		}

		// Store text data in Firebase
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
				// store the serial number under the user's data as well.
				firebase.database().ref('users/' + userId).child("bikes").push({
					serial:serial
		}).then(function() {myBikes();});
			}, function(error) {
				console.log('ERROR saving data: ', error.code);
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
					var bikeData = theBike.val();
					//Get image of bike
					var user = firebase.auth().currentUser;
					var userId = user.uid;
					var imagePath = firebase.storage().ref('/users/' + userId + '/bikes/' + bikeData.serial);
					imagePath.child('bikePic').getDownloadURL().then(function(url) {
						bikeData.bikePic = url;
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
		if(snapshot.val()) {
			loadedUser = snapshot.val();
			callback();
		}
	});
	}
}





function closePopup(popup) {
	$("#" + popup).popup("close");
}




function searchSerial() {
	var searchId = $('#serialSearch').val();
	var bikeDict = {};
	var getBike = firebase.database().ref('/bikes/'+searchId);
			getBike.on("value", function(theBike) {
				bikeDict["bike"] = ( theBike.val());
				if(theBike.val()) {
					insertTemplate(bikeDict, "lookup", "#lookup-container");
				} else {
					insertTemplate({},"noSerial","#lookup-container")
				}
			});
};

//sass --watch scss:cs

//cd into www
//handlebars -m js/templates/> js/templates/templates.js
