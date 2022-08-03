const CompanyModel = require("../models/company-model");
const JobModel = require("../models/job-model");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
// const companyModel = require("../models/company-model");

const createCompany = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  console.log(req.body);
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
    console.log(req.session.Errormsg);
  }
  res.render("company/company-login", { name: "shamili", Errormsg: req.session.Errormsg });
  req.session.Errormsg = false
};

const doLogin = async function (req, res) {
  console.log(req.body);
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
  res.render("company/company-profile");
};

const addJobPage = function (req, res) {
  res.render("company/add-job-form");
};
const addjob = async function (req, res) {
  console.log(req.body);
  req.body.companyName = req.session.company.company.companyname;
  req.body.companyId = req.session.company.company._id;
  await JobModel.create(req.body);
  res.redirect("/company/home");

};
const getUpdatePage = function (req, res) {
  res.render("company/update-company-page");
};

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
};
