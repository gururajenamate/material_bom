sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.ulli.materialbom.controller.Main", {
        onInit() {
        },

        toggleOpenState: function(oEvent) {
            debugger;

            var oSelectedObj = oEvent.getParameter("rowContext").getObject();

            if(oSelectedObj.HierarchyLevel === 0) {
                this.ParentNodeID = oSelectedObj.NodeID;
            }
        },

        rowsUpdated: function(oEvent) {
            var oTable = oEvent.getSource();
            var aRows = oTable.getRows();
            var oParentNodeID = this.ParentNodeID;
            
            aRows.forEach(function(oRow) {
                var oContext = oRow.getBindingContext();
                var oData = oContext?.getObject();
                
                if (oData && oData.ParentNodeID === oParentNodeID) {
                    this.expandTree(oData.NodeID);
                    
                    if (oRow.isExpandable() && !oRow.isExpanded()) {
                        oTable.expand(oRow.getIndex());
                    }
                }
            }, this);
        },

        expandTree: function(oParentNodeID) {
            var oTable = this.getView().byId("treeTable");
            var aRows = oTable.getRows();
            // var oParentNodeID = this.ParentNodeID;
            
            aRows.forEach(function(oRow) {
                var oContext = oRow.getBindingContext();
                var oData = oContext?.getObject();
                
                if (oData && oData.ParentNodeID === oParentNodeID) {
                    this.ParentNodeID = oData.NodeID;
                    
                    if (oRow.isExpandable() && !oRow.isExpanded()) {
                        oTable.expand(oRow.getIndex());
                    }
                }
            }, this);
        }


        
    });
});