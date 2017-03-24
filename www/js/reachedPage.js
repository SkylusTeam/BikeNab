

  ///////////////////////////////////////////
 ////		reachedPage FUNCTIONS		////
///////////////////////////////////////////


// These functions specify what should happen once we reach a new
// page, typically involving shoving data into a Handlebars template



//Huge mega switch statement telling what we should do when each page loads
$("body").on('pagecontainerbeforeshow', function(event, data) {
	// Typically called when the person has just reloaded the page
	if (!loadedUser) {
		loadedUser = localStorage.getItem('loadedUser');
		if (loadedUser && loadedUser.police) {
			addMenu(loadedUser.police);
		}
	}  

	// Pages you can navigate to w/o being logged in.
	var loggedOutPages = ['login', 'create-account', 'le-create-account', 'about'];
	if (!loadedUser && ($.inArray(data.toPage[0].id, loggedOutPages) === -1)) {
		//Uh oh!  Someone's trying to access a logged-in page when they're not logged in.
		goSomewhere('#login');
		alert("To access this page, please log in.");
	} else {
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
	}
});



//TODO: Can we reuse code among any of these?

function insertTemplate(data, templateName, containerID) {
	let template = Handlebars.templates[templateName];
	$(containerID).html(template(data));
	$(containerID).enhanceWithin();
}


function reachedLeReports() {
	insertTemplate({reports: userData.reports, following: false}, "leReports", "#le-reports-container");
	insertTemplate({reports: userData.reports, following: true}, "leReports", "#le-area-reports-container");
}


function reachedHome() {
	insertTemplate({police: loadedUser.police}, "home", "#home-container");
}






function reachedBikeDetail() { //*kangaroo

	var serial = localStorage.getItem('serial');
	var currBike;
	var getBike = firebase.database().ref('/bikes/' + serial);
	getBike.on("value", function(theBike) {
		currBike = theBike.val();
		if (currBike) {
			//Get images
			var user = firebase.auth().currentUser;
			var userId = user.uid;
			var imagePath = firebase.storage().ref('/users/' + userId + '/bikes/' + currBike.serial);
			
			imagePath.child('bikePic').getDownloadURL().then(function(url) {
				console.log("bikePic should be working!");
				currBike.bikePic = url;
			}).catch(function(error) {
				console.log("error:", error.code);
			}).then(function(url) {
				console.log("second thing!");
				imagePath.child('bikeOwnerPic').getDownloadURL().then(function(url) {
				console.log("owner pic should be working");
				currBike.bikeOwnerPic = url;
			}).catch(function(error) {
				console.log("error:", error.code);
			}).then(function(url) {
				console.log("after first error");
				imagePath.child('bikeSerialPic').getDownloadURL().then(function(url) {
				currBike.bikeSerialPic = url;
			}).catch(function(error) {
				console.log("error:", error.code);
			}).then(function(url) {
				imagePath.child('receiptPic').getDownloadURL().then(function(url) {
				currBike.receiptPic = url;
			}).catch(function(error) {
				console.log("error:", error.code);
			})
			}).then(function(url) {
				console.log("stuff after thens");
				//If it's your bike, have a parameter that says that
				if(currBike.ownerid == firebase.auth().currentUser.uid) //could be a one liner
					currBike.mine = true;
				else
					currBike.mine = false;

				insertTemplate(currBike, "bikeDetail", "#bike-detail-container");
			})
			})
			});

			


		}
	})

}


function reachedEditBikeInfo() {
	let bikesList = userData.bikes;
	for (bike of bikesList) {
		if (bike.serial === localStorage.getItem('serial')) {
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
	console.log(data)
	if (loadedReports) {
		data.reports = loadedReports.reports;

		data.reports.forEach(function(report, index, reportArr) {
			for (bike in data.bikes) {
				if (bike.serial === report.serial) {
					reportArr[index].bike = bike;
				}
			}
		});
		insertTemplate(data, "reports", "#reports-container");
		insertTemplate(userData, "reportABike", "#report-a-bike-container");
	} else {
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
	if (localStorage.getItem('newReportSerial')) {
		data={serial: localStorage.getItem('newReportSerial')};
		localStorage.removeItem('newReportSerial');
	}
	insertTemplate(data, "report", "#report-container");
}


function reachedEditReport() {
	for (report of userData.reports) {
		if (report.reportID === localStorage.getItem('reportID')) {
			insertTemplate(report, "report", "#edit-report-container");
		}
	}
}

function reachedUnregister() {
	insertTemplate({serial: localStorage.getItem('serial') , model:localStorage.getItem('model')}, "unregister", "#unregister-container");
}

function reachedProfile() {
	var profileData = loadedUser;
	insertTemplate(profileData, "profile", "#profile-container");
}

function reachedMyBikes() {
	var user = firebase.auth().currentUser;

	if (user) {
		var userId = user.uid;
		bikeDict = loadedBikes;
		insertTemplate(bikeDict, "myBikes", "#my-bikes-container");
		} else {
			insertTemplate(userData, "myBikes", "#my-bikes-container");
		}
}

function reachedLookup() {
	const privacy = getPrivacySetting(normalData.bikes[0], normalData.privacy);
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



