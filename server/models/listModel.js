const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const myURI = `mongodb+srv://aderritt6158:G5@cluster2.0ungyhq.mongodb.net/?retryWrites=true&w=majority`;

const URI = myURI;

mongoose.connect(URI);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

const mySchema = new Schema({
  listItem: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: false, default: Date.now },
});

const Item = model('Item', mySchema);

module.exports = Item;
