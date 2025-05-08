const { verifySignUp, uploadFile } = require("../middleware");
const controller = require("../controller/auth/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 //console.log("puloaddata",uploadFile);
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      uploadFile.single("document")
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/forgotepassword", controller.forgote_password);
  app.post("/api/auth/changepassword", controller.changepassword);
  app.post("/api/auth/resetpassword", controller.resetpassword);
  app.post("/api/auth/gotodashboard", controller.gotodashboard);

};