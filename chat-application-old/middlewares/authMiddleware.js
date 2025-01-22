const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};


const preventLoggedInAccess = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/dashboard');  // Redirect to dashboard if logged in
    }
    next();
};

module.exports = { authMiddleware, preventLoggedInAccess };
