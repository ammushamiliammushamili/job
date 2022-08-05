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
    companyUpdatePage,
} = require("../controllers/company-controller");
const checkcompany = require("../middilewares/check-company");
// const { doLogin } = require("../controllers/user-controller");

/* GET users listing. */
router.get("/home",);

router.get("/compsignup", getSignupPage);

router.post("/compsignup", createCompany);

router.get("/complogin", getLoginPage);

router.post("/complogin", doLogin);

router.get("/compprofile", checkcompany, getProfilePage);

router.get("/addjob", checkcompany, addJobPage);
router.post("/addjob", checkcompany, addjob);

router.get("/updatecompany", checkcompany, getUpdatePage);
router.post('/updatecompany', companyUpdatePage)

router.get("/home", checkcompany, companyHomepage);

module.exports = router;
