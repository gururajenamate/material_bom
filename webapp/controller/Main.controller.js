sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.ulli.materialbom.controller.Main", {
        onInit() {
            this.initialLoad = true;
        },

        toggleOpenState: function (oEvent) {
            this.expand = oEvent.getParameter("expanded");
            if (this.expand) {
                var oSelectedObj = oEvent.getParameter("rowContext").getObject();

                if (oSelectedObj.HierarchyLevel === 0) {
                    this.ParentNodeID = oSelectedObj.NodeID;
                }
            }
        },

        rowsUpdated: function (oEvent) {
            var oTable = oEvent.getSource();
            var aRows = oTable.getRows();
            if (this.expand) {
                var oParentNodeID = this.ParentNodeID;

                aRows.forEach(function (oRow) {
                    var oContext = oRow.getBindingContext();
                    var oData = oContext?.getObject();

                    if (oData && oData.ParentNodeID === oParentNodeID) {

                        this.expandTree(oData.NodeID);

                        if (oRow.isExpandable() && !oRow.isExpanded()) {
                            this.fetchColumnData(oContext);
                            oTable.expand(oRow.getIndex());
                        } else if (!oRow.isExpandable()) {
                            this.fetchColumnData(oContext);
                        }
                    }
                }, this);
            } else if(this.initialLoad){
                this.initialLoad = false;
                aRows.forEach(function (oRow) {
                    var oContext = oRow.getBindingContext();
                    this.fetchColumnData(oContext);
                }, this);
            }
        },

        expandTree: function (oParentNodeID) {
            var oTable = this.getView().byId("treeTable");
            var aRows = oTable.getRows();
            // var oParentNodeID = this.ParentNodeID;

            aRows.forEach(function (oRow) {
                var oContext = oRow.getBindingContext();
                var oData = oContext?.getObject();

                if (oData && oData.ParentNodeID === oParentNodeID) {

                    this.expandTree(oData.NodeID);

                    if (oRow.isExpandable() && !oRow.isExpanded()) {
                        this.fetchColumnData(oContext);
                        oTable.expand(oRow.getIndex());
                    } else if (!oRow.isExpandable()) {
                        this.fetchColumnData(oContext);
                    }
                }
            }, this);
        },

        fetchColumnData: function (oContext) {
            // Call service here and set data for columns
            if (oContext && !oContext.getProperty("Column1")) {
                const m = oContext.getProperty("Description")+"_";
                oContext.setProperty("Column1", m+Math.random().toString(36).substring(7));
                oContext.setProperty("Column2", m+Math.random().toString(36).substring(7));
                oContext.setProperty("Column3", m+Math.random().toString(36).substring(7));
                oContext.setProperty("Column4", m+Math.random().toString(36).substring(7));
                oContext.setProperty("Column5", m+Math.random().toString(36).substring(7));
            }
        }


    });
});