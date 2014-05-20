// info.js
// --------------
// Requires define
// Return Backbone Model {Object}

define([
	"baseModel"
	], function(
	BaseModel
	) {

	return BaseModel.extend({
		apiUrl: "/",
		autoFetch: true,
		url : function() {
			return this.apiUrl + "auth/myself";
		}
	});
});
