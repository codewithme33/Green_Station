const passport = require("passport");

exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

exports.googleCallback = passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login",
});

exports.getUser = (req, res) => {
    res.json(req.user || null);
};

exports.logout = (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.redirect(process.env.CLIENT_URL);
    });
};
