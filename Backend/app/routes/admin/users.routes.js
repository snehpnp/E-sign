const { authJwt, uploadFile, verifySignUp } = require("../../middleware");
const express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs-extra');
const path = require('path');
const users = require("../../controller/admin/users.controller");
var imagepathhh = path.join(__dirname, '../../');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Retrieve all Users
    app.post("/api/users/add", [
        authJwt.verifyToken,
        authJwt.isAdmin,
        verifySignUp.checkRolesExisted,
        // uploadFile.single("document"),
        verifySignUp.checkDuplicateUsernameOrEmail,
    ],
        users.AddClient);


    // Retrieve all Users
    app.get("/api/users", [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
        users.findAll);




    // Retrieve a single User with id
    app.get("/api/users/:id", [
    ], users.findOne);

    // Update a User with id
    app.put("/api/users/:id", [
        authJwt.verifyToken,
        authJwt.isAdmin,
        uploadFile.single("document")
    ], users.update);

    // Delete a User with id
    app.delete("/api/users/:id", [
        authJwt.verifyToken,
        authJwt.isAdmin
    ], users.delete);

    app.get("/api/adminstamp/:id", users.adminstamp);
    app.get("/api/userdata/:id", users.userdata);

    app.post("/api/admin/counts/", [
        authJwt.verifyToken,
        authJwt.isAdmin
    ], users.Counts);

    app.post("/api/admin/fundhistory/", [
        authJwt.verifyToken,
        authJwt.isAdmin
    ], users.fundhistory);

    app.post("/api/admin/transictionhistory/", [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ], users.transictionhistory);

    app.post("/api/users/updateurl/", [
    ], users.updateurl);

    app.post("/api/users/saveotp/", [
    ], users.saveotp);

    app.post("/api/users/signeddocument/", [
    ], users.signeddocument);

    app.post("/api/users/sendotp/", users.sendotp);


    app.post("/api/packagedetails/", [
        //  authJwt.verifyToken,
        //  authJwt.isAdmin,
    ], users.findOnePackage);

    app.post("/api/users/kycdocument/", [
    ], users.kycdocument);

    app.post("/api/users/signeddocumentotp/", [
    ], users.signeddocumentotp);

    app.post("/api/users/updatenumber/", [
    ], users.updatealternatenumber);

    app.post("/api/users/kycdata/", [
    ], users.kycdata);

    app.post("/api/users/resendlink/", [
    ], users.resendlink);

    app.post("/api/users/bulkresendlink/", [
    ], users.bulkresendlink);

    app.post("/api/users/sendlink/", [
    ], users.sendlink);
    app.post("/api/templates/users/", [
    ], users.clientacctemplate);



    // Retrieve all Users
    app.post("/api/templete/image", [

        uploadFile.single("image"),
    ],
        users.addimage);

    app.post("/api/user/esign/", [
    ], users.generat_eesign);

    app.post("/api/user/client_id/", [
    ], users.client_id);


    app.post("/api/users/addbulk", [
        // authJwt.verifyToken,
        // authJwt.isAdmin,
        // verifySignUp.checkRolesExisted,
        // uploadFile.single("document"),
        // verifySignUp.checkDuplicateUsernameOrEmail,
    ],
        users.AddbulkClient);
    app.post("/api/users/bulkmailsend", [
        // authJwt.verifyToken,
        // authJwt.isAdmin,
        // verifySignUp.checkRolesExisted,
        // uploadFile.single("document"),
        // verifySignUp.checkDuplicateUsernameOrEmail,
    ],
        users.bulkmailsend);

    app.post("/api/user_templates", [
        // authJwt.verifyToken,
        // authJwt.isAdmin,
        // verifySignUp.checkRolesExisted,
        // uploadFile.single("document"),
        // verifySignUp.checkDuplicateUsernameOrEmail,
    ],
        users.user_templates);
    app.get("/api/templates/allusers/", [
    ], users.Alluserwithtemplate);
    app.post("/api/usertemplatecheck/", [
    ], users.checkusertemplate);
    app.post("/api/template/sign_status", [
    ], users.templatesignstatus);

    app.post("/api/templates/getuserlistwithtempleteid/", [
    ], users.FindByUserWithTempleteId);
    app.post("/api/user/generatesignstatus/", [
    ], users.generatesignstatus);
};



