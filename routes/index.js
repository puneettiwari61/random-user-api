var express = require("express");
var router = express.Router();

var hash = 'bundle.a1a3cbe7e55d2cbcbc80';

/* GET home page. */
router.get("*", function (req, res, next) {
  const cssPath =
    process.env.NODE_ENV == "production" ? `/bundle/${hash}.css` : "/static/bundle.css";
  const jsPath = process.env.NODE_ENV == "production" ? `/bundle/${hash}.js` : "/static/bundle.js";
  res.render("index", { title: "Jobs | AltCampus", jsPath, cssPath });
});

module.exports = router;
