// NO SHOW
$( document ).ready(function() {
	//Pics show up when you upload an image file
	$(document).on('change',  function(e) {
		var target = e.target;
		if ($(e.target).attr('type') == 'file') {
			var pic = $(target).parent().prev();
			var picFile = URL.createObjectURL(e.target.files[0]);
			pic.attr('src', picFile);
			console.log("putting new pic in");
			var img = new Image();
			img.onload = function() {
				var data = {};
				data.origX = 0
				data.origY = 0;
				data.origW = this.width;
				data.origH = this.height;
				data.src = picFile;

				//Save data object in array
				console.log("right before index");
				console.log(document.getElementById("testPic").getAttribute("picindex"));

				picIndex = parseInt(document.getElementById("testPic").getAttribute("picindex"));
				console.log("JUST SET PICINDEX TO ", picIndex);
				console.log("Index: ", picIndex);
				console.log("after index");
				picData[picIndex] = data;

			}
			img.src = picFile;

			if(jcrop_api) {
				jcrop_api.destroy();
			}

			$("#testPic").attr('src', picFile);
			$("#pic-to-crop").attr('src', picFile);
			setUpPhotoCrop(name);
			jcrop_api.setImage(picFile); 
			console.log("data set");
			
			$( "#test-popup" ).popup( "open" );
		}
	});


});


var picData = [null, null, null]; //TODO: Right number 
var boundx, boundy;
var jcrop_api;
var picIndex;

jQuery(function($) {
	setUpPhotoCrop();
});





$( window ).resize(function() {
	//Anything window-size-dependent changes here!
	setUpPhotoCrop();
});


function cropBoxSetup(totalWidth) {
	console.log("cropBoxSetup");
	jcrop_api = $.Jcrop('#pic-to-crop', {
		setSelect:   [ 0, 0, 80, 45 ],
		aspectRatio: 16 / 9,
		boxWidth: Math.round(totalWidth * .85),
		minSize: [100, 100],
		onSelect: updatePic
	});
}



function setUpPhotoCrop(name) {
	let totalWidth = $('[data-role="page"]').first().width();
	$('#test-popup').width(totalWidth * .9);
	cropBoxSetup(totalWidth);
}



function updatePic(c) {
	console.log("update pic called");
	let xsize =  $("#test-container").width();
	let ysize =  $("#test-container").height();
	var rx = xsize / c.w;
	var ry = ysize / c.h;
	console.log("picIndex: ", picIndex);
	console.log(picData);
	var data = picData[picIndex]; //Deep or shallow?
	console.log("DATA: ", data);
	if (data) {
		data.finalX = c.x;
		data.finalY = c.y;
		data.finalW = c.w;
		data.finalH = c.H;

		console.log("DATA HERE!", data);

		$("#testPic").css({
			width: Math.round(rx * data.origW) + 'px',
			height: Math.round(ry * data.origH) + 'px',
			marginLeft: '-' + Math.round(rx * c.x) + 'px',
			marginTop: '-' + Math.round(ry * c.y) + 'px'
		});

	}
	


	
}



function savePic(index) {
	console.log("about to save pic");
	var data = picData[index];
	console.log("Data: ", data);
	//Save cropped pic in firebases
	var canvas = document.getElementById("cropCanvas");
	console.log("Canvas: ", canvas);
	var context = canvas.getContext('2d');


	console.log("Context: ", context);
	var newPic = new Image();
	newPic.onload = function() {
		console.log("in onload");
		//http://stackoverflow.com/questions/37873808/how-can-i-save-canvas-as-image-to-firebase-storage
		context.drawImage(newPic, data.origX, data.origY, data.origW, data.origH, data.finalX, data.finalY, data.finalW, data.finalH);
		console.log("drew image");

		canvas.toBlob(function(blob) {
			console.log("to blob");
			// var croppedPic = new Image();
			// croppedPic.src = blob;
			firebase.storage().ref().child('testing').put(blob);
			console.log("firebase!");
		})
	}//http://www.html5canvastutorials.com/tutorials/html5-canvas-image-crop/
	console.log("newpic.src");
	newPic.src = data.src;

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
