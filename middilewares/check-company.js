const checkcompany = function (req, res, next) {
    if (req.session.company) {
        next()
    } else {
        res.redirect('/company/complogin')
    }
}
module.exports = checkcompany