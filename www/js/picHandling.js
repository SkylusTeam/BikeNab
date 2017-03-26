var picData = [null, null, null, null]; //TODO: Four elements (for the four pics we have)
var jcrop_api;
var picIndex;



$( document ).ready(function() {
	//This function gets called when any file input changes (add/remove a file)
	$(document).on('change',  function(e) {
		var target = e.target; // Target is the element which got changed

		//Double check the 'change' event was triggered by a file upload
		if ($(e.target).attr('type') == 'file') {
			var files = e.target.files;
			console.log("Files is: ", files);

			// Make sure we have a file (i.e. that the user didn't press 'Cancel')
			if (files.length > 0) {
				console.log("setting stuff");
				var picFile = URL.createObjectURL(files[0]);
				var img = new Image();
				img.onload = function() {
					//Save info about object in a data object
					var data = {};
					data.origX = 0
					data.origY = 0;
					data.origW = this.width;
					data.origH = this.height;
					data.src = picFile;

					//Save data object in array
					picIndex = parseInt($(e.target).parent().prev().children().attr("picindex"));
					console.log("just set picIndex to ", picIndex);
					picData[picIndex] = data;

				}
				img.src = picFile;

				// Destroy the jcrop api if it exists (to prevent double-adding pics)
				if(jcrop_api) {
					jcrop_api.destroy();
				}

				// Visually display pic in crop window and on the normal page
				$(e.target).parent().prev().children().attr('src', picFile);
				$("#pic-to-crop").attr('src', picFile);
				setUpPhotoCrop(name);
				jcrop_api.setImage(picFile); 
				$( "#crop-popup" ).popup( "open" );
			} else { //User must have pressed "cancel." Pic is gone.
				//Clear input
				$(e.target).val('');
				//Clear pic
				$(e.target).parent().prev().children().attr('src', '');
			}
		}
	});

});



//TODO: Is this even necessary?
jQuery(function($) {
	setUpPhotoCrop();
});


// Clears file from file input and img.
// Triggered by clicking an 'X' button
function clearFile(name) {
	$("#" + name + 'Button').val('');
	$("#" + name + 'Pic').attr('src', '');
	jcrop_api.destroy();
}


// Set up the crop box using Jcrop
function cropBoxSetup(totalWidth) {
	jcrop_api = $.Jcrop('#pic-to-crop', {
		setSelect:   [ 0, 0, 80, 45 ],
		aspectRatio: 16 / 9,
		boxWidth: Math.round(totalWidth * .85),
		onSelect: updatePic
	});
}

var testVar = -123;
var testVar2 = 123;

// Set up the cropping window
function setUpPhotoCrop(name) {
	let totalWidth = $('[data-role="page"]').first().width();
	$('#test-popup').width(totalWidth * .9);
	cropBoxSetup(totalWidth);
}


// Every time a pic has been cropped, save the crop data
// and display the updated image
function updatePic(c) { //TODO: Function called more often than you expect
	let xsize =  250; //medium-pic-container css width
	let ysize =  141; //medium-pic-container css height
	var rx = xsize / c.w;
	var ry = ysize / c.h;
	var data = picData[picIndex];
	console.log("picindex is: ", picIndex);

	if (picIndex === 0) {
		testVar = c.h;
		console.log("changing testVar.")
	}

	console.log("testvar is: ", testVar);
	console.log("testvar type is: ", typeof testVar);
	console.log("testvar2 type is: ", typeof testVar2);

	if (data) {

		console.log('data is (before): ', JSON.stringify(picData));

		// Save crop data
		data.finalX = c.x;
		//data.finalY = c.y;
		//data.finalW = c.w;
		//data.finalH = c.h;

		console.log("type: ", typeof c);
		console.log("type2: ", typeof c.h);

		var height = JSON.parse(JSON.stringify(c));
		data.finalH = height.h;


		var width = JSON.parse(JSON.stringify(c.w));
		data.finalW = width;






		console.log('data is (after): ', picData);

		console.log("PIC INDEX IS ", picIndex);

		// Update image display
		$('[picindex=' + picIndex + ']').css({
			width: Math.round(rx * data.origW) + 'px',
			height: Math.round(ry * data.origH) + 'px',
			marginLeft: '-' + Math.round(rx * c.x) + 'px',
			marginTop: '-' + Math.round(ry * c.y) + 'px'
		});
	}
}


// Save cropped pics to Firebase
// (Triggered when the Register Bike form is submitted)
function savePic(index, picName, userId, serial) {
	console.log("saving pic: ", index, picName, userId, serial);
	var data = picData[index];
	console.log("data: ", data);
	console.log('picData: ', picData);

	// var canvas = document.createElement('canvas');//document.getElementById("cropCanvas"); // This is a hidden element on the register bike's page
	// canvas.width = 250;
	// canvas.height = 141;
	// canvas.id = "canvas" + picName;
	// document.getElementById("canvasDiv").innerHTML = canvas;
	// console.log("CANVAS DIV: ", document.getElementById("canvasDiv"));

	

	// If the pic is blank, no need to save it
	if (data) {

		//var canvas;
		if (picName === 'bikePic') {
			// console.log("first case!!!");
			// canvas = document.getElementById("canvasBike");
			// console.log("canvas: ", canvas);
			// If there was something on the canvas before, get rid of it.	
			// var context = canvas.getContext('2d');
			// console.log("context: ", context);
			// //context.clearRect(0, 0, canvas.width, canvas.height);
			// var newPic = new Image();
			// 	newPic.onload = function() {
			// 		// context.drawImage(newPic, data.finalX, data.finalY, data.finalW, data.finalH, 0,0, 250, 141);
			// 		// canvas.toBlob(function(blob) {
			// 		// 	console.log("picname is " + picName);
			// 		// 	firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picName).put(blob);
			// 		// });
			// 	};
			// 	//The pic which is going to be drawn on the canvas will have the pic-to-save as its src
			// 	newPic.src = data.src;
		} else {
			var canvas;
			console.log("actually saving pic: ", index, picName, userId, serial);
			canvas = document.getElementById("canvasBikeOwner");
			console.log("canvas: ", canvas);
			// If there was something on the canvas before, get rid of it.	
			var context = canvas.getContext('2d');
			console.log("context: ", context);
			//context.clearRect(0, 0, canvas.width, canvas.height);
			var newPic = new Image();
				newPic.onload = function() {
					context.drawImage(newPic, data.finalX, data.finalY, data.finalW, data.finalH, 0,0, 250, 141);
					canvas.toBlob(function(blob) {
						console.log("picname is " + picName);
						firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picName).put(blob);
					});
				};
				//The pic which is going to be drawn on the canvas will have the pic-to-save as its src
				newPic.src = data.src;
		}


	// console.log("canvas: ", canvas);
	// // If there was something on the canvas before, get rid of it.	
	// var context = canvas.getContext('2d');
	// console.log("context: ", context);
	// //context.clearRect(0, 0, canvas.width, canvas.height);
	// var newPic = new Image();
	// 	newPic.onload = function() {
	// 		context.drawImage(newPic, data.finalX, data.finalY, data.finalW, data.finalH, 0,0, 250, 141);
	// 		canvas.toBlob(function(blob) {
	// 			console.log("picname is " + picName);
	// 			firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picName).put(blob);
	// 		});
	// 	};
	// 	//The pic which is going to be drawn on the canvas will have the pic-to-save as its src
	// 	newPic.src = data.src;

	}
}





function takePhoto (id) {
	if (!isMobile()) {
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


		var options = {	quality: 50,
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
