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
                var sPath = sap.ui.require.toUrl("project9/images/OIP.webp"); //setting image path
                oImage.setSrc(sPath);
            }

            var oInvoiceModel = new JSONModel(); //creates json model
            oInvoiceModel.loadData(sap.ui.require.toUrl("project9/model/invoices.json")); //load data from json file
            this.getView().setModel(oInvoiceModel, "invoiceModel");//attaches model to view with name invoiceModel
        },

        onHomePress: function () {
             MessageToast.show("Welcome to Application");
        },//empty function

        onBackPress: function () {
 
            this._viewState = 0;  //reset state this is for success box

            this.byId("formContainer").setVisible(true); // show form again when we click navigation icon in invoices data
            this.byId("footerBar").setVisible(true);

            this.byId("successContainer").setVisible(false);//used to hide other sections
            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);
            this.byId("successBox").setVisible(true);//shows success box only
        },

        onSubmit: function () { //submit button

            MessageToast.show("Thank You!"); //pops up message

            this.byId("formContainer").setVisible(false); //hides form and footer section
            this.byId("footerBar").setVisible(false);
            this.byId("successContainer").setVisible(true); //only showa success

            this.byId("successBox").setVisible(true);
            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);

            this._viewState = 0; //reset state
        },

        onShowImage: function () {  //image show
 
            var oSuccessBox = this.byId("successBox");
            var oImage = this.byId("imageContainer");
            var oInvoice = this.byId("invoiceContainer");

            this._viewState++; // move to next state

            if (this._viewState > 2) {  //cycle b/w invoice(2) & image(1)
                this._viewState = 1;
            }

            if (this._viewState === 1) { //show image
                oSuccessBox.setVisible(false);
                oImage.setVisible(true); //shows image only
                oInvoice.setVisible(false);

            } else if (this._viewState === 2) {
                oSuccessBox.setVisible(false);
                oImage.setVisible(false);
                oInvoice.setVisible(true); //shows invoice only
            }
        },

        onPreviousPress: function () {

            this._viewState = 0;

            this.byId("successBox").setVisible(true); //aftr clicking previous button show only successbox
            this.byId("imageContainer").setVisible(false);
            this.byId("invoiceContainer").setVisible(false);
        },

        onResubmit: function () {

            this.byId("formContainer").setVisible(true);
            this.byId("headerBar").setVisible(true);
            this.byId("footerBar").setVisible(true);
            this.byId("successContainer").setVisible(false); //hides success message

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