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
    return next({ log: 'Unable to retrieve items check server logs' });
  }
};

itemController.postItems = async (req, res, next) => {
  //break down the request
  const { listItem, password, date } = req.body;
  try {
    console.log('Posting Items');
    const newItems = await Item.create({
      listItem: listItem,
      password: password,
      date: date,
    });
    res.locals.newItems = newItems;
    return next();
  } catch (err) {
    return next({ log: 'Unable to post new items check server logs' });
  }
};

itemController.updateItems = async (req, res, next) => {
  //break down the request
  console.log('Entering Update Items');
  const { id } = req.params;
  console.log(id);
  const { listItem } = req.body;
  console.log('req.body', req.body);
  try {
    //findOneandUpdate
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      { listItem: listItem },
      {
        new: true,
      }
    );
    console.log('updated', updatedItem);
    res.locals.newItem = updatedItem;
    return next();
  } catch (err) {
    return next({ log: 'Unable to update item list check server logs' });
  }
};

itemController.delItems = async (req, res, next) => {
  console.log('In Del Items Controller');
  //break down the id
  const { id } = req.params;
  //deconstruct the storedPassword from the cookies
  const { pass: storedPass } = req.cookies;
  //deconstruct the password from the body
  console.log(req.cookies.pass);
  try {
    // if (storedPass !== ) {
    //   return next(err);
    // }
    //find one and delete but stored in a variable and await
    const removed = await Item.findOneAndDelete({ _id: id });
    //check if there was anything to remove in the first place
    if (removed === null) {
      console.log('nothing to delete');
    } else {
      console.log(
        `The following item has been removed successfully matching the id of ${id} and reads as follows ${removed}`
      );
    }
    return next();
  } catch (err) {
    return next({ log: 'Unable to delete items check server logs' });
  }
};

module.exports = itemController;
