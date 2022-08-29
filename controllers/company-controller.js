const CompanyModel = require("../models/company-model");
const JobModel = require("../models/job-model");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const companyModel = require("../models/company-model");
const async = require("hbs/lib/async");
const jobModel = require("../models/job-model");
const jobapplicationModel = require("../models/jobapplication-model");
const nottificationModel = require("../models/nottification-model");
// const companyModel = require("../models/company-model");

const createCompany = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  // console.log(req.body);
  await CompanyModel.create(req.body);
  res.redirect('/company/complogin');
};

const companyHomepage = function (req, res) {
  console.log(req.session.company.company);
  res.render('company/home')
};
const getSignupPage = function (req, res) {
  res.render("company/company-signup");
};

const getLoginPage = function (req, res) {
  if (req.session.Errormsg) {
    // console.log(req.session.Errormsg);
  }
  res.render("company/company-login", { name: "shamili", Errormsg: req.session.Errormsg });
  req.session.Errormsg = false
};

const doLogin = async function (req, res) {
  // console.log(req.body);
  let company = await CompanyModel.findOne({ email: req.body.email });
  console.log(company);
  if (company) {
    let validPassword = await bcrypt.compare(req.body.password, company.password);
    console.log(validPassword);
    if (validPassword) {
      req.session.company = company
      // res.send("successfully login");
      res.redirect('/company/home')
    } else {
      req.session.Errormsg = "wrong password"
      res.redirect('/company/complogin')
      // } res.send("login failed");
    }
  }
  else {
    req.session.Errormsg = "wrong email"
    res.redirect('/company/complogin')
  }
}
const getProfilePage = function (req, res) {
  console.log(req.session.company);
  res.render("company/company-profile", { company: req.session.company });
};

const addJobPage = function (req, res) {
  res.render("company/add-job-form");
};
const addjob = async function (req, res) {
  // console.log(req.body);
  req.body.companyName = req.session.company.companyname;
  req.body.companyId = req.session.company._id;
  await JobModel.create(req.body);
  res.redirect("/company/home");

};
const companyUpdatePage = async function (req, res) {
  let { _id } = req.session.company;
  let { image } = req.files;
  await image.mv('./public/images/company/profile/' + _id + ".jpg")
  req.body.additionalInform = true
  let company = await companyModel.findOneAndUpdate({ _id: req.session._id },
    req.body, { new: true }
  )
  console.log(company);
  req.session.company = company
  res.redirect('/company/compprofile')
  // console.log(req.body);

}

const getUpdatePage = function (req, res) {
  // console.log(req.session.company);
  res.render("company/update-company-page", { company: req.session.company });
};
const viewjob = async function (req, res) {
  let { _id } = req.session.company
  let allJobs = await jobModel.find({ companyId: _id })
  res.render('company/viewjobs', { allJobs })
}
const viewJobApplication = async function (req, res) {
  let { _id } = req.session.company
  let jobapplications = await jobapplicationModel.find({ companyId: _id, status: "applied" })
  console.log(jobapplications);
  res.render('company/job-application', { jobapplications })

}
const acceptjob = async function (req, res) {
  // console.log("hi");
  let accept = await jobapplicationModel.findOneAndUpdate({ _id: req.params.id }, { status: "accepted" })
  let nottificationObj = {
    from: req.session.company.email,
    to: accept.email,
    fromName: req.session.company.companyname,
    message: "your job application is accepted",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  }
  await nottificationModel.create(nottificationObj);
  console.log(nottificationObj);
  res.redirect("/company/viewjobApplication")
};
const rejectjob = async function (req, res) {
  let nottificationObj = {
    from: req.session.company.email,
    to: reject.email,
    fromName: req.session.company.companyname,
    message: "your job application is rejected",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  }
  await nottificationModel.create(nottificationObj);
  console.log(nottificationObj);


  res.redirect("/company/viewjobApplication")
}

module.exports = {
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
};
