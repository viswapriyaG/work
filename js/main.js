// Task class to represent a task
class Task {
    constructor(title, description, dueDate) {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = false;
    }
}

// ToDoList class to manage the list of tasks
class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.render();
    }

    addTask(task) {
        this.tasks.push(task);
        this.save();
        this.render();
    }

    editTask(id, updatedTask) {
        this.tasks = this.tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task);
        this.save();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    }

    toggleComplete(id) {
        this.tasks = this.tasks.map(task => task.id === id ? { ...task, complete: !task.complete } : task);
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    render() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = task.complete ? 'complete' : '';
            taskItem.innerHTML = `
                <span>${task.title} - ${task.dueDate}</span>
                <div>
                    <button class="edit-btn" onclick="editTask('${task.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            `;
            taskItem.onclick = () => this.toggleComplete(task.id);
            taskList.appendChild(taskItem);
        });
    }
}

const toDoList = new ToDoList();

document.getElementById('add-task-btn').addEventListener('click', () => {
    const title = document.getElementById('new-task-title').value;
    const description = document.getElementById('new-task-desc').value;
    const dueDate = document.getElementById('new-task-date').value;
    if (title && dueDate) {
        const task = new Task(title, description, dueDate);
        toDoList.addTask(task);
        document.getElementById('new-task-title').value = '';
        document.getElementById('new-task-desc').value = '';
        document.getElementById('new-task-date').value = '';
    }
});

window.editTask = (id) => {
    const title = prompt('Enter new title:');
    const description = prompt('Enter new description:');
    const dueDate = prompt('Enter new due date:');
    if (title && dueDate) {
        toDoList.editTask(id, { title, description, dueDate });
    }
};

window.deleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
        toDoList.deleteTask(id);
    }
};