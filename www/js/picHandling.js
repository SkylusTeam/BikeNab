$( document ).ready(function() {
	//Pics show up when you upload an image file
	$(document).on('change',  function(e) {
		var target = e.target;
		if ($(e.target).attr('type') == 'file') {
			var pic = $(target).parent().prev();
			var file = e.target.files[0];
			pic.attr('src', URL.createObjectURL(file));
		}
	});


});



jQuery(function($) {
	setUpPhotoCrop();
});


$( window ).resize(function() {
	//Anything window-size-dependent changes here!
	setUpPhotoCrop();
});


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

