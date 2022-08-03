var express = require("express");
var router = express.Router();

let {
    getSignupPage,
    getLoginPage,
    companyHomepage,
    createCompany,
    getProfilePage,
    addJobPage,
    getUpdatePage,
    doLogin,
    addjob,
} = require("../controllers/company-controller");
const checkcompany = require("../middilewares/check-company");
// const { doLogin } = require("../controllers/user-controller");

/* GET users listing. */
router.get("/home",);

router.get("/compsignup", getSignupPage);

router.post("/compsignup", createCompany);

router.get("/complogin", getLoginPage);

router.post("/complogin", doLogin);

router.get("/compprofile", getProfilePage);

router.get("/addjob", checkcompany, addJobPage);
router.post("/addjob", checkcompany, addjob);

router.get("/updatecompany", getUpdatePage);
router.get("/home", checkcompany, companyHomepage);

module.exports = router;
