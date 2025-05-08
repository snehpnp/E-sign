const { authJwt, uploadFile, verifySignUp } = require("../../middleware");

const controller = require("../../controller/admin/tamplate.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve all Users
    app.post("/api/add/template", [],
        controller.addtemplate);
    app.get("/api/alltemplate", [],
        controller.alltemplate);
    app.post("/api/edit/template", [],
        controller.findOne);
    app.post("/api/update/template", [],
        controller.update);
    app.post("/api/delete/template", [],
        controller.delete);
    app.post("/api/createpdf", [],
        controller.createpdf);
    app.post("/api/editpdf", [],
        controller.editpdftemplate);
    app.post("/api/add/variable", [],
        controller.addvariable);  
    app.post("/api/get/variable", [],
        controller.getdata);
    app.get("/api/all/variable", [],
        controller.allvariables); 
    app.post("/api/add/details", [],
        controller.add_detailes);   

};