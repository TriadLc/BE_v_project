import db from "../models/index";

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

module.exports = {
  getAboutPage: getAboutPage,
};
