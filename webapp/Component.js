sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/odata/v2/ODataModel",
	"com/ulli/materialbom/localService/mockserver"
], function(UIComponent, ODataModel, mockserver) {
	"use strict";

	return UIComponent.extend("com.ulli.materialbom.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			const sODataServiceUrl = "/here/goes/your/odata/service/url/";

			// init our mock server
			this.oMockServer = mockserver.init(sODataServiceUrl);

			// set model on component
			this.setModel(
				new ODataModel(sODataServiceUrl, {
					json: true,
					useBatch: true
				})
			);

            // set the device model
            // this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
		},
		exit: function() {
			const oModel = this.getModel();
			this.setModel();
			oModel.destroy();

			this.oMockServer.destroy();
			this.oMockServer = null;
		}
	});
});