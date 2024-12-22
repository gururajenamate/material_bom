/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"comulli/material_bom/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});