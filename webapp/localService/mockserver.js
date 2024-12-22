sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	return {

		init: function(sODataServiceUrl) {
			const oMockServer = new MockServer({
				rootUri: sODataServiceUrl
			});
			const sLocalServicePath = sap.ui.require.toUrl("com/ulli/materialbom/localService");

			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 500
			});

			oMockServer.simulate(sLocalServicePath + "/metadata.xml", {
				sMockdataBaseUrl: sLocalServicePath + "/mockdata",
				bGenerateMissingMockData: false
			});

			oMockServer.start();

			return oMockServer;
		}

	};

});