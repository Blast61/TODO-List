document.addEventListener('DOMContentLoaded', () => {
  //invoke ya funcs here buddy
  //Notes for after:
  //1. Style sheet wasn't linked also spelled "styles" in the file structure
  //2. Change the script tagging the index.js to javascript/main.js gotta match file names
  console.log('DOM FIRED UP!');
  getItems();
});

async function getItems() {
  const itemList = document.getElementById('item-list');
  //enter a try block
  try {
    //await a fetch request
    const allItems = await fetch('/item');
    //json parse it
    console.log(allItems);
    const responses = await allItems.json();
    responses.forEach((item) => {
      //create your list items here
      const li = document.createElement('li');
      //attach your listItem and created at properties to your new element
      const liItem = item.listItem;
      const liDate = item.date;
      li.innerText = `Task: ${liItem} Created: ${liDate}`;
      //create your delBtn
      const delBtn = document.createElement('button');
      delBtn.setAttribute('class', 'del');
      delBtn.innerText = 'Delete';
      li.appendChild(delBtn);
      //add an event listener to delBtn
      delBtn.addEventListener('click', async () => {
        try {
          //break down the id from the item
          const itemID = item._id;
          //on every delete click send a fetch request to the back end
          const delRequest = await fetch(`/item/${itemID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
          const res = await delRequest.json();
          console.log(res);
          return res;
        } catch (err) {
          return `Unable to delete item logging ${err}`;
        }
      });
      //append the li's to the message list
      itemList.appendChild(li);
      //return it
      return itemList;
    });
  } catch (err) {
    return 'Unable to retrieve all items';
  }
}
