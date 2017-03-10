

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