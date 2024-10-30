// Is auth midleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return res.redirect('/'); 
    }
    next(); 
};

module.exports = isAuthenticated;