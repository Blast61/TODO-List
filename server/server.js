const express = require('express');
const app = express();
const PORT = 3434;
const itemController = require('./controllers/listController');
const cookieController = require('./controllers/cookieController');
const cookieParser = require('cookie-parser');

//parse incoming data
app.use(express.json());
//account for form data
app.use(express.urlencoded());
//cookie parse
app.use(cookieParser());

//serve the files
app.use(express.static('assets'));
app.use(express.static('views'));

//routes
app.get('/item', itemController.getItems, (req, res) => {
  console.log('Back in the server');
  return res.status(200).json(res.locals.allItems);
});
app.post(
  '/item',
  cookieController.setCookie,
  itemController.postItems,
  (req, res) => {
    console.log('Back in the server');
    return res.status(200).json(res.locals.newItems);
  }
);
app.patch('/item/:id', itemController.updateItems, (req, res) => {
  console.log('Back in the server');
  return res.status(200).json(res.locals.newItem);
});
app.delete(
  '/item/:id',
  cookieController.checkCookie,
  itemController.delItems,
  (req, res) => {
    return res.status(204)
  }
);
//404
app.use((req, res) => {
  res.status(404).send(`This is not the page you're looking for...`);
});

//GEH
app.use((err, req, res, next) => {
  const def = {
    message: `GEH caught unknown error`,
    status: 400,
    log: { error: `Check server logs for details logging ${err}` },
  };
  const errorObj = Object.assign(def, err);
  const message = errorObj.message;
  return res.status(errorObj.status).send(message);
});

//listen
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
