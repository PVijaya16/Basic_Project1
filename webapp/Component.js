sap.ui.define([
    "sap/ui/core/UIComponent",
    "project9/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("project9.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            // Device model
            this.setModel(models.createDeviceModel(), "device");

            // Local JSON model
            this.setModel(models.createLocalModel());

            this.getRouter().initialize();
        }
    });
});