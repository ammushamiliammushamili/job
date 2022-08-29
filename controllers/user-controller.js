const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const JobModel = require("../models/job-model");
const userModel = require("../models/user-model");
const async = require("hbs/lib/async");
const JobapplicationModel = require("../models/jobapplication-model");
const jobapplicationModel = require("../models/jobapplication-model");
const nottificationModel = require("../models/nottification-model");


const createUser = async function (req, res) {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    console.log(req.body);
    await UserModel.create(req.body);
    // res.send("hi");
    res.redirect('/login')
};

const getHomePage = function (req, res, next) {
    console.log(req.session.user.user);
    res.render("index", { title: "node", name: "shamili", marks: { cs: 96 } });
};

const getSignupPage = function (req, res) {
    res.render("user/signup", { name: "shamili" });
};

const userhomepage = function (req, res) {
    res.render('user/home-page')
}
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
            res.redirect('/homepage')
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
    res.render("user/user-profile", { user: req.session.user });

};

const userUpdatePage = function (req, res) {
    console.log(req.session.user);
    res.render("user/user-update", { user: req.session.user });
};
const updateuserprofile = async function (req, res) {
    let { _id } = req.session.user;
    let { image, resume } = req.files
    await image.mv('./public/images/user/profile/' + _id + ".jpg")
    await resume.mv('./public/images/user/resume/' + _id + ".pdf")
    req.body.additionalinform = true
    let user = await UserModel.findOneAndUpdate({ _id: req.session.user._id },
        req.body, { new: true }
    )
    console.log(user);
    req.session.user = user
    // req.session.user._id = user._conditions._id
    res.redirect('/profile')
    // console.log(req.body);
    console.log(req.files);
}
const viewjobsPage = async function (req, res) {
    let allJobs = await JobModel.find({})
    console.log(allJobs);
    res.render('user/view-jobs', { allJobs })
}
const viewjobapplication = async function (req, res) {
    // let{_id}=req.session.user
    let jobapplication = await jobapplicationModel.find({ userId: req.session.user._id })
    res.render("user/viewjobapplication", { jobapplication })
}
const applyjob = async function (req, res) {
    console.log(req.body);
    let d = new Date().toLocaleDateString()
    console.log(d);
    console.log(req.session.user);
    let { jobId, companyName, companyId } = req.body;
    let { _id, username, email, number } = req.session.user;
    let jobapplication = await JobapplicationModel.create({
        jobId: jobId,
        userId: _id,
        userName: username,
        email: email,
        number: number,
        companyId, companyName,
        ApplyDate: d,
    });
    console.log(jobapplication);
    res.redirect("/")
};
const nottificationPage = async function (req, res) {
    let allnottifications = await nottificationModel.find({ to: req.session.user.email })
    res.render('user/notification', { allnottifications })

}

module.exports = {
    getHomePage,
    getSignupPage,
    createUser,
    userLoginPage,
    userProfilepage,
    userUpdatePage,
    doLogin,
    viewjobsPage,
    userhomepage,
    updateuserprofile,
    applyjob,
    viewjobapplication,
    nottificationPage

};
