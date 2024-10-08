const DeleteBtn = document.getElementById(`Delete`);
const CreateBtn = document.getElementById(`Create`);
const RestBtn = document.getElementById(`Rest`);

const Input = document.getElementById(`TaskNameInput`);

// the wrapper for all the todo items
const todo = document.getElementById(`todo`); 

// Load tasks from local storage on page load
window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `<input class="checkbox" type="checkbox"><label>${task}</label>`;
        todo.appendChild(newItem);
    });
}

CreateBtn.onclick = function() {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `<input class="checkbox" type="checkbox"><label>${Input.value}</label>`;
    todo.appendChild(newItem);
    
    // Save the new task to local storage
    saveTask(Input.value);
    Input.value = '';
}

DeleteBtn.onclick = function() {
    todo.querySelectorAll('.item:has(input:checked)').forEach(item => {
        const label = item.querySelector('label').innerText;
        removeTask(label); // Remove from local storage
        item.remove();
    });
}

RestBtn.onclick = function() {
    todo.innerHTML = ``;
    localStorage.removeItem('tasks'); // Clear tasks from local storage
}

Input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        CreateBtn.click(); // Simulate a click on the Create button
    }
});

// Function to save tasks to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}