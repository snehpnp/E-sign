const { authJwt } = require("../../middleware");

const package = require("../../controller/superadmin/packages.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Add Packages

    app.post("/api/package/add", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ],
        package.AddPackage);

    app.get("/api/packages", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ],
        package.findAll);

    app.get("/api/package/:id", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], package.findOne);

    // Update a Package with id
    app.put("/api/package/:id", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], package.update);

    // Delete a Package with id
    app.delete("/api/package/:id", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], package.delete);

};