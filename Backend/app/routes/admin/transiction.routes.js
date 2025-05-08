const { authJwt, uploadFile, verifySignUp } = require("../../middleware");

const controller = require("../../controller/admin/transiction.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve all Users
    app.post("/api/transiction", [
        ],
        controller.transictionhistory);
    app.post("/api/checkcallback", [],
        controller.checkcallback);

};