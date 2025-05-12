const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Add an event listener for the "Enter" key press on the input box
inputBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") { // Check if the "Enter" key was pressed
    AddTask(); // Call the AddTask function
  }
});

function AddTask() {
  if (inputBox.value === '') {
    alert("You must write something!")
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle('checked');

    if (e.target.classList.contains('checked')) {
      // Move the checked task to the bottom
      e.target.classList.add('move-to-bottom'); // Add animation class
      setTimeout(() => {
        listContainer.appendChild(e.target);
        e.target.classList.remove('move-to-bottom'); // Remove the animation class after moving
      }, 500); // Match the timeout with the CSS transition duration (0.5s)
    } else {
      // Move the unchecked task to the top
      e.target.classList.add('move-to-top'); // Add animation class
      setTimeout(() => {
        listContainer.insertBefore(e.target, listContainer.firstChild);
        e.target.classList.remove('move-to-top'); // Remove the animation class after moving
      }, 500); // Match the timeout with the CSS transition duration (0.5s)
    }

    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showList() {
  listContainer.innerHTML = localStorage.getItem('data');
}
showList();