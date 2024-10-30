const authMiddleware = (req, res, next) => {
    res.locals.isAuthenticated = !!req.session.userId;
    res.locals.username = req.session.username || null;  
    next();
};

module.exports = authMiddleware;
