const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const JobModel = require("../models/job-model");


const createUser = async function (req, res) {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    console.log(req.body);
    await UserModel.create(req.body);
    res.send("hi");
};

const getHomePage = function (req, res, next) {
    console.log(req.session.user.user);
    res.render("index", { title: "node", name: "shamili", marks: { cs: 96 } });
};

const getSignupPage = function (req, res) {
    res.render("user/signup", { name: "shamili" });
};

const userLoginPage = function (req, res) {
    if (req.session.Errormsg) {
        console.log(req.session.Errormsg);
    }
    res.render("user/login", { name: "shamili", Errormsg: req.session.Errormsg });
    req.session.Errormsg = false
};
const doLogin = async function (req, res) {
    console.log(req.body);
    let user = await UserModel.findOne({ email: req.body.email, });
    console.log(user);
    if (user) {
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(validPassword);
        if (validPassword) {
            req.session.user = user
            // res.send("successfully login");
            res.redirect('/home')
        } else {
            req.session.Errormsg = "worong password"
            res.redirect("/login");
        }
    } else {
        req.session.Errormsg = "invalied email"
        res.redirect('/login')
    }
};

const userProfilepage = function (req, res) {
    console.log(req.session.user);
    res.render("user/user-profile", { name: "shamili" });
};

const userUpdatePage = function (req, res) {
    console.log(req.session.user);
    res.render("user/user-update");
};
const viewjobsPage = async function (req, res) {
    let allJobs = await JobModel.find({})
    console.log(allJobs);
    res.render('user/view-jobs', { allJobs })
}

module.exports = {
    getHomePage,
    getSignupPage,
    createUser,
    userLoginPage,
    userProfilepage,
    userUpdatePage,
    doLogin,
    viewjobsPage
};
