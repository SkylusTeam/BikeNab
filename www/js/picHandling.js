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
				console.log("pic  to set");
				console.log($(e.target));
				console.log($(e.target).parent());
				console.log($(e.target).parent().prev());
				console.log($(e.target).parent().prev().children());

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


// Set up the cropping window
function setUpPhotoCrop(name) {
	let totalWidth = $('[data-role="page"]').first().width();
	$('#test-popup').width(totalWidth * .9);
	cropBoxSetup(totalWidth);
}


// Every time a pic has been cropped, save the crop data
// and display the updated image
function updatePic(c) {
	let xsize =  250; //medium-pic-container css width
	let ysize =  141; //medium-pic-container css height
	var rx = xsize / c.w;
	var ry = ysize / c.h;
	var data = picData[picIndex];

	if (data) {
		// Save crop data
		data.finalX = c.x;
		data.finalY = c.y;
		data.finalW = c.w;
		data.finalH = c.H;

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
	console.log("saving pic");
	console.log("index is ", index);
	console.log("picData is ", picData);
	var data = picData[index];

	var canvas = document.getElementById("cropCanvas"); // This is a hidden element on the register bike's page
	var context = canvas.getContext('2d');
	var newPic = new Image();

	// If the pic is blank, no need to save it
	if (data) {
		console.log("got a src");
		newPic.onload = function() {
			console.log("about to draw image");
			// Draw the cropped image on the canvas (so we can save just the crop)
			context.drawImage(newPic, data.finalX, data.finalY, data.finalW, data.finalH);//, data.finalX, data.finalY, data.finalW, data.finalH);
			console.log("drew image");
			var dataURL = canvas.toDataURL();
			//$("#receiptPic").attr('src', dataURL);
			//$("#bikeSerialPic").attr('src', newPic.src);
			//firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picName).put(dataURL);
			canvas.toBlob(function(blob) {
				console.log("got blob");
				console.log("about to put " + picName);
				firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picName).put(blob);
				//console.log("about to put receiptPic");
				//firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + "receiptPic").put(dataURL);
				//console.log("just about to display");
				//$("#bikeOwnerPic").attr('src', URL.createObjectURL(blob));
				//console.log("displayed");
			})
		}
		//The pic which is going to be drawn on the canvas will have the pic-to-save as its src
		newPic.src = data.src;

	}
	console.log("about to go home");
	
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
