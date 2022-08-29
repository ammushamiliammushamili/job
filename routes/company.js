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
    viewjob,
    viewJobApplication,
    acceptjob,
    rejectjob
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
router.get("/viewjob", checkcompany, viewjob)
router.get("/viewjobApplication", checkcompany, viewJobApplication)
router.get("/acceptjob/:id", checkcompany, acceptjob)
router.get("/rejectjob/:id", checkcompany, rejectjob)
router.get('/nottifications')
module.exports = router;
