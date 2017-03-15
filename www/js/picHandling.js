// NO SHOW
$( document ).ready(function() {
	//Pics show up when you upload an image file
	$(document).on('change',  function(e) {
		var target = e.target;
		if ($(e.target).attr('type') == 'file') {
			var files = e.target.files;
			console.log("Files is: ", files);
			if (files.length > 0) {
				console.log("setting stuff");
				var picFile = URL.createObjectURL(files[0]);
				var img = new Image();
				img.onload = function() {
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

				if(jcrop_api) {
					jcrop_api.destroy();
				}
				console.log("pic  to set");
				console.log($(e.target));
				console.log($(e.target).parent());
				console.log($(e.target).parent().prev());
				console.log($(e.target).parent().prev().children());

				$(e.target).parent().prev().children().attr('src', picFile);
				$("#pic-to-crop").attr('src', picFile);
				setUpPhotoCrop(name);
				jcrop_api.setImage(picFile); 
				$( "#crop-popup" ).popup( "open" );
			} else {
				//Clear input
				$(e.target).val('');
				//Clear pic
				$(e.target).parent().prev().children().attr('src', '');
			}
		}
	});


});


var picData = [null, null, null, null]; //TODO: Right number 
var jcrop_api;
var picIndex;

jQuery(function($) {
	setUpPhotoCrop();
});


function clearFile(name) {
	$("#" + name + 'Button').val('');
	$("#" + name + 'Pic').attr('src', '');
	jcrop_api.destroy();
}



function cropBoxSetup(totalWidth) {
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
	let xsize =  250; //medium-pic-container css width
	let ysize =  141; //medium-pic-container css height
	var rx = xsize / c.w;
	var ry = ysize / c.h;
	var data = picData[picIndex]; //Deep or shallow?

	if (data) {
		data.finalX = c.x;
		data.finalY = c.y;
		data.finalW = c.w;
		data.finalH = c.H;

		console.log("PIC INDEX IS ", picIndex);
		$('[picindex=' + picIndex + ']').css({
			width: Math.round(rx * data.origW) + 'px',
			height: Math.round(ry * data.origH) + 'px',
			marginLeft: '-' + Math.round(rx * c.x) + 'px',
			marginTop: '-' + Math.round(ry * c.y) + 'px'
		});
	}
}



function savePic(index, picName, userId, serial) {
	console.log("saving pic");
	var data = picData[index];
	//Save cropped pic in firebases
	var canvas = document.getElementById("cropCanvas");
	var context = canvas.getContext('2d');
	var newPic = new Image();

	newPic.onload = function() {
		console.log("about to draw image");
		context.drawImage(newPic, data.origX, data.origY, data.origW, data.origH, data.finalX, data.finalY, data.finalW, data.finalH);
		console.log("drew image");
		canvas.toBlob(function(blob) {
			console.log("got blob");
			firebase.storage().ref().child("users/" + userId + "/bikes/" + serial + "/" + picName).put(blob);
		})
	}
	if (data.src) {
		console.log("got a src");
		newPic.src = data.src;
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
