sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {

        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createLocalModel: function () {
            var oModel = new JSONModel();

            // ✅ FLP SAFE PATH
            var sPath = sap.ui.require.toUrl("project9/model/data.json");

            oModel.loadData(sPath);
            return oModel;
        }
    };
});