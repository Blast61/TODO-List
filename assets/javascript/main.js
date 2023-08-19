document.addEventListener('DOMContentLoaded', () => {
  //invoke ya funcs here buddy
  //Notes for after:
  //1. Style sheet wasn't linked also spelled "styles" in the file structure
  //2. Change the script tagging the index.js to javascript/main.js gotta match file names
  console.log('DOM FIRED UP!');
  getItems();
  newItem();
});

async function getItems() {
  const itemList = document.getElementById('item-list');
  //enter a try block
  const itemText = document.getElementById('desc');

  try {
    //await a fetch request
    const allItems = await fetch('/item');
    //json parse it
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
      const editBtn = document.createElement('button');
      editBtn.setAttribute('class', 'edit');
      editBtn.innerText = 'Edit';
      li.appendChild(delBtn);
      li.appendChild(editBtn);
      itemList.appendChild(li);
      //add an event listener to delBtn
      delBtn.addEventListener('click', async () => {
        // const target = document.querySelector('li');
        console.log('clicked delete');
        try {
          //break down the id from the item
          const itemID = item._id;
          //on every delete click send a fetch request to the back end
          const delRequest = await fetch(`/item/${itemID}`, {
            method: 'DELETE',
          });

          li.remove();
        } catch (err) {
          return `Unable to delete item logging ${err}`;
        }
      });
      editBtn.addEventListener('click', async () => {
        try {
          const itemId = item._id;
          const editReq = await fetch(`/item/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              listItem: itemText.value,
            }),
          });

          const res = await editReq.json();
          return res;
        } catch (err) {
          return `Unable to update item logging ${err}`;
        }
      });
      //return it
      return itemList;
    });
  } catch (err) {
    return 'Unable to retrieve all items';
  }
}

async function newItem() {
  try {
    const itemList = document.getElementById('item-list');
    const itemText = document.getElementById('desc');
    const passText = document.getElementById('pass');
    const item = itemText.value;
    const pass = passText.value;
    const addBtn = document.getElementById('add');
    addBtn.addEventListener('click', async () => {
      console.log('clicked');
      try {
        const newItems = await fetch('/item', {
          method: 'POST',
          body: JSON.stringify({
            listItem: itemText.value,
            password: passText.value,
          }),
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
        //json parse it
        const res = await newItems.json();
        //create your list items here
        const li = document.createElement('li');
        //attach your listItem and created at properties to your new element
        const liItem = res.listItem;
        const liDate = res.date;
        li.innerText = `Task: ${liItem} Created: ${liDate}`;
        //create your delBtn
        const delBtn = document.createElement('button');
        //set attribute of class to del
        delBtn.setAttribute('class', 'del');
        //create text on button
        delBtn.innerText = 'Delete';
        const editBtn = document.createElement('button');
        //set attribute of class to edit
        editBtn.setAttribute('class', 'edit');
        //set text of edit button
        editBtn.innerText = 'Edit';
        //append all as children to li then to the item list
        li.appendChild(delBtn);
        li.appendChild(editBtn);
        itemList.appendChild(li);
      } catch (err) {
        return `Unable to add item logging ${err}`;
      }
    });
  } catch (err) {
    return `Unable to add item logging 2 ${err}`;
  }
}
