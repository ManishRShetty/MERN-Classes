// script.js
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// script.js (continued)
todoForm.addEventListener('submit', function(event) {
 // Prevent the form from submitting and reloading the page
 event.preventDefault();
 // Get the text from the input, and trim whitespace
 const taskText = todoInput.value.trim();
 // If the input is not empty, add the task
 if (taskText !== '') {
 addTask(taskText);
 saveTasks(); // Save after adding
 // Clear the input field for the next entry
 todoInput.value = "";
 // Put focus back on the input field
 todoInput.focus();
 }
});

function addTask(taskText, isCompleted = false) {
 // Create a new list item element
 const li = document.createElement('li');
 // If the task is completed, add the 'completed' class
 if (isCompleted) {
 li.classList.add('completed');
 }
 // Create a span to hold the task text
 const taskSpan = document.createElement('span');
 taskSpan.textContent = taskText;
 // Create a delete button
 const deleteBtn = document.createElement('button');
 deleteBtn.textContent = 'Delete';
 deleteBtn.classList.add('delete-btn');
 // Append the span and button to the list item
 li.appendChild(taskSpan);
 li.appendChild(deleteBtn);
 // Append the list item to the task list (<ul>)
 taskList.appendChild(li);
}

// script.js (continued)
taskList.addEventListener('click', function(event) {
 // Check if a delete button was clicked
 if (event.target.classList.contains('delete-btn')) {
 // Get the parent <li> and remove it from the taskList
 const li = event.target.parentElement;
 taskList.removeChild(li);
 saveTasks(); // Save after deleting
 }
 // Check if the task text (span) was clicked to toggle completion
 if (event.target.tagName === 'SPAN') {
 const li = event.target.parentElement;
 li.classList.toggle('completed');
 saveTasks(); // Save after toggling completion
 }
});

// script.js (continued)
function saveTasks() {
 const tasks = [];
 // Loop through all the <li> elements in the task list
 taskList.querySelectorAll('li').forEach(function(li) {
 // Create an object for each task
 tasks.push({
 text: li.querySelector('span').textContent,
 completed: li.classList.contains('completed')
 });
 });
 // Convert the array of task objects to a JSON string and save to localStorage
 localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
 // Get the tasks string from localStorage
 const tasks = JSON.parse(localStorage.getItem('tasks'));
 // If there are tasks, loop through them and add them to the DOM
 if (tasks) {
 tasks.forEach(function(task) {
 addTask(task.text, task.completed);
 });
 }
}