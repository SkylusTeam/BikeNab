

  ///////////////////////////////////////////
 ////		toNewPage FUNCTIONS			////
///////////////////////////////////////////

// These functions specify what values you should save into
// local storage before going to each page


//Switch to the given page of the app
function goSomewhere(page, lePage) {
	if (typeof loadedUser != 'undefined' && loadedUser.police == true && lePage) {
		$.mobile.pageContainer.pagecontainer("change", lePage, {});
	} else {
		$.mobile.pageContainer.pagecontainer("change", page, {});
	}


	// if(page =='#home' && firebase.auth().currentUser && !loadedBikes) {
	// 	//loadedUser = initProfile();
	// 	//myBikes();
	// 	//loadedReports = loadReports();
	// } else {
		
	// }
}


//TODO: Reuse code here
function toBikeDetail(serial) {
	if(typeof(Storage) != "undefined") {
		localStorage.setItem('serial', serial);
	} //TODO: Where should we store LE data?
	goSomewhere("#bike-detail");
}

function toReport(serial) {
	if(typeof(Storage) != "undefined") {
		localStorage.setItem('newReportSerial', serial);
	}
	goSomewhere("#report");
}


function toEditReport(id) {
	if(typeof(Storage) != "undefined") {
		localStorage.setItem('reportID', id);
	}
	goSomewhere("#edit-report");
}


function toUnregister(serial, model) {
	localStorage.setItem('serial', serial);
	localStorage.setItem('model', model);
	goSomewhere('#unregister');
}