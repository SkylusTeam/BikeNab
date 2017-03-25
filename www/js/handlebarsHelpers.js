
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

Handlebars.partials = Handlebars.templates;

