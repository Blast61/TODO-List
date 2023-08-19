const Item = require('../models/listModel');
const cookieController = {};

cookieController.setCookie = async (req, res, next) => {
  //deconstruct the password
  const { password } = req.body;
  try {
    res.cookie('pass', password);
    return next();
  } catch (err) {
    return next(err);
  }
};

cookieController.checkCookie = async (req, res, next) => {
  const { id } = req.params;
  const storedPass = req.cookies.pass;
  const { password, listItem } = req.body;
  try {
    console.log('password', password);
    console.log('Checking Cookies');
    if (storedPass !== password) {
      return next(err);
    }
    const storedItem = await Item.findOne({ listItem, password });
    res.cookie('pass', storedItem.password);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = cookieController;
