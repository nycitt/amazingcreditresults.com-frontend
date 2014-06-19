// list.js
// --------------
// Requires define
// Return Backbone View {Object}

define([
	"dataTable",
	"adminDashboard/models/reset-password",
	"adminDashboard/models/welcome-email",
	"adminDashboard/models/update-buyer"
	], function(
	DataTable,
	resetPasswordModel,
	welcomeEmailModel,
	updateBuyerModel
	) {

	return DataTable.extend({

		el: undefined,
		
		pageSize: 5,
		
		selectedRows: [],
		
		columns:  [
					 {
			     name: "",
			     cell: "select-row",
			     headerCell: "select-all" 
 			  },
		{
				label: "First Name",
				name : "name.givenName",
				cell : "string",
				editable: false,
				formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
			      fromRaw: function (rawValue, model) {
			        return model.get("name").givenName;
			      }
			    })
			}, {
				label: "Last Name",
				name : "name.familyName",
				cell : "string",
				editable: false,
				formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
			      fromRaw: function (rawValue, model) {
			        return model.get("name").familyName;
			      }
			    })
			}, {
				label: "Roles",
				name : "roles",
				cell : "string",
				editable: false,
				formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
			      fromRaw: function (rawValue, model) {
			        var roles = [];
			        if(model.get("roles").owner) roles.push("owner");
			        if(model.get("roles").buyer) roles.push("buyer");
			        if(model.get("roles").seller) roles.push("seller");
			        return roles.join(", ");
			      }
			    })
			}, {
				label: "Email",
				name : "email",
				cell : "string",
				editable: false
			}, {
				label: "Verified",
				name : "accountVerified",
				cell : "boolean",
				model: updateBuyerModel
			}, {
				label: "Edit",
				name : "edit",
				cell : "actionButton",
				callback: function(userId) {
					App.routing.navigate("admin/user/"+userId, {
						trigger : true
					});
				}
			}, {
				label: "needQuestionnaire",
				name : "needQuestionnaire",
				getValue: function(model) {
					return model.get("profile").needQuestionnaire;
				},
				cell : "boolean",
				model: updateBuyerModel
			},{
				label: "Banned",
				name : "isBanned",
				cell : "boolean",
				model: updateBuyerModel
			}
			,{
				label: "Reset Password Email",
				name : "resetButton",
				cell : "resetButton"
			},{
				label: "Welcome Email",
				name : "actions",
				cell : "welcomeEmail"			
			}],
			
		url: "api/v1/admin/clients",
		
		parse: function(result) {
			return result.data;
		},
		
		initializeBefore: function() {
			this.addResetButton(resetPasswordModel);
			this.welcomeEmailButton(welcomeEmailModel);
			this.addCheckbox();
			this.addActionButton();
		}
	});
});