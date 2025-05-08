const { authJwt, uploadImg } = require("../../middleware");

const system = require("../../controller/admin/system.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve all Admin Syaytem details By id
    app.get("/api/system/:id", [
            authJwt.verifyToken,
            authJwt.isSuperAdminOrAdminOrSubAdmin
        ],
        system.findAll);


    // Update a System Admin with id
    app.put("/api/system/:id", [
        //authJwt.verifyToken,
        //authJwt.isSuperAdminOrAdminOrSubAdmin,
        // uploadImg.single("company_logo")
    ], system.update);


};