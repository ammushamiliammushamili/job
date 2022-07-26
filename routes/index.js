var express = require("express");
var router = express.Router();

let {
    // getHomePage,
    getSignupPage,
    createUser,
    userLoginPage,
    userProfilepage,
    userUpdatePage,
    doLogin,
    viewjobsPage,
    getHomePage,
    userhomepage,
    updateuserprofile,
} = require("../controllers/user-controller");
const checkUser = require("../middilewares/check-user");

/* GET home page. */

router.get("/", checkUser, getHomePage);
// router.get("/home", getHomePage);
// router.get("/login", function (req, res) {
//   res.render("login", { companyname: "zion it" });
// });
// router.get("/signup", getSignupPage);

// router.post("/signup", createUser);

router.route("/signup").get(getSignupPage).post(createUser);

router.route("/login").get(userLoginPage).post(doLogin);

router.get("/profile", checkUser, userProfilepage);

router.get("/update", checkUser, userUpdatePage);
router.post('/update', checkUser, updateuserprofile)

router.get("/viewjobs", checkUser, viewjobsPage)
router.get("/homepage", userhomepage)
module.exports = router;
