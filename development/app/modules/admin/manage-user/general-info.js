define([
	'core/form/form-view'
], function(
	Form
){
	return Form.extend({
		options: {
			renderOn: 'initialize',
			templateData: {
				submitButton: 'Create User'
			}
		},
		
		hooks: {
			'append:before': ['getParentModel']
		},
		
		getParentModel: function(parentView){
			this.model = parentView.model;
		}
	});
});