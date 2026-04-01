sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("project9.controller.View1", {

        formatSkills: function (aSkills) {
            if (!aSkills) return "";   //if skills are empty returns empty string
            return aSkills.map(function (o) {
                return o.name;
            }).join(", ");  //this converts array like java python
        },

        onInit: function () {

            this._viewState = 0; //success message

            var oImage = this.byId("myImage");
            if (oImage) {
                var sPath = sap.ui.require.toUrl("project9/images/OIP.webp");
                oImage.setSrc(sPath);
            }

            var oInvoiceModel = new JSONModel();
            oInvoiceModel.loadData(sap.ui.require.toUrl("project9/model/invoices.json"));
            this.getView().setModel(oInvoiceModel, "invoiceModel");
        },

        onHomePress: function () {},

        onBackPress: function () {

            this._viewState = 0;

            this.byId("formContainer").setVisible(true);
            this.byId("footerBar").setVisible(true);

            this.byId("successContainer").setVisible(false);
            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);
            this.byId("successBox").setVisible(true);
        },

        onSubmit: function () {

            MessageToast.show("Thank You!");

            this.byId("formContainer").setVisible(false);
            this.byId("footerBar").setVisible(false);
            this.byId("successContainer").setVisible(true);

            this.byId("successBox").setVisible(true);
            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);

            this._viewState = 0;
        },

        onShowImage: function () {

            var oSuccessBox = this.byId("successBox");
            var oImage = this.byId("imageContainer");
            var oInvoice = this.byId("invoiceContainer");

            this._viewState++;

            if (this._viewState > 2) {
                this._viewState = 1;
            }

            if (this._viewState === 1) {
                oSuccessBox.setVisible(false);
                oImage.setVisible(true);
                oInvoice.setVisible(false);

            } else if (this._viewState === 2) {
                oSuccessBox.setVisible(false);
                oImage.setVisible(false);
                oInvoice.setVisible(true);
            }
        },

        onPreviousPress: function () {

            this._viewState = 0;

            this.byId("successBox").setVisible(true);
            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);
        },

        onResubmit: function () {

            this.byId("formContainer").setVisible(true);
            this.byId("headerBar").setVisible(true);
            this.byId("footerBar").setVisible(true);
            this.byId("successContainer").setVisible(false);

            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);

            this._viewState = 0;
        },

        onCancel: function () {
            var oModel = this.getView().getModel();
            oModel.loadData(sap.ui.require.toUrl("project9/model/data.json"));
            MessageToast.show("Form Reset Successfully!");
        }

    });
});