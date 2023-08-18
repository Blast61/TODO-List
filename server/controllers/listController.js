const Item = require('../models/listModel');
const itemController = {};

itemController.getItems = async (req, res, next) => {
  //try block
  try {
    console.log(`Retrieving Items`);
    //await finding all db items
    const allItems = await Item.find({});
    //store on res.locals
    res.locals.allItems = allItems;
    //return next
    return next();
  } catch (err) {
    return next(err);
  }
};

itemController.postItems = async (req, res, next) => {
  //break down the request
  const { listItem, password } = req.body;
  try {
    console.log('Posting Items');
    const newItems = await Item.create({
      listItem: listItem,
      password: password,
    });
    res.locals.newItems = newItems;
    return next();
  } catch (err) {
    return next(err);
  }
};

itemController.delItems = async (req, res, next) => {
  //break down the id
  const { id } = req.params;
  try {
    //find one and delete but stored in a variable and await
    const removed = await Item.findOneAndDelete({ _id: id });
    //send a message back to the server on the locals
    res.locals.removed = 'Successfully deleted item';
    return next();
  } catch (err) {
    return next();
  }
};

module.exports = itemController;
