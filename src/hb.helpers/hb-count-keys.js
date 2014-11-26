/* Handlerbars helper to count keys inside an object */
module.exports.register = function(Handlerbars) {
	Handlerbars.registerHelper('countKeys', function(object, options) {
		var result, key;

		result = 0;
		for (key in object) {
			if (object.hasOwnProperty(key)) {
				result = result + 1;
			}
		}

		return result;
	});
}