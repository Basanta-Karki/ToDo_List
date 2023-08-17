
const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const text = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

// Retrieve user data from local storage
let objStr = localStorage.getItem('users');
if (objStr != null) {
   userArray = JSON.parse(objStr);
}

DisplayInfo();

addUserBtn.onclick = () => {
   const name = text.value;
   if (edit_id !== null) {
      // Edit action
      userArray[edit_id].name = name; // Update the existing name
      edit_id = null;
   } else {
      // Insert action
      userArray.push({ name: name });
   }

   SaveInfo(userArray);
   text.value = '';
   addUserBtn.innerText = btnText;
}

function SaveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   DisplayInfo();
}

function DisplayInfo() {
   let statement = '';
   userArray.forEach((user, i) => {
      statement += `<tr>
           <th scope="row">${i + 1}</th>
           <td>${user.name}</td>
           <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
         </tr>`;
   });
   recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {
   edit_id = id;
   text.value = userArray[id].name;
   addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id) {
   userArray.splice(id, 1); // Remove the item at the specified index
   SaveInfo(userArray);
}
