const Item = require('../models/listModel');
const cookieController = {};

cookieController.setCookie = async (req, res, next) => {
  //deconstruct the password
  const { password } = req.body;
  try {
    res.cookie('pass', password);
    return next();
  } catch (err) {
    return next({ log: 'Failed to set Cookie' });
  }
};

cookieController.checkCookie = async (req, res, next) => {
  const { id } = req.params;
  const storedPass = req.cookies.pass;
  console.log(storedPass, 'storedPass');
  try {
    console.log('Checking Cookies');
    const storedItem = await Item.findOne({ _id: id });
    res.cookie('pass', storedItem._id);
    return next();
  } catch (err) {
    return next({
      log: 'Authentication failed check backend server logs',
      status: 401,
    });
  }
};

module.exports = cookieController;
