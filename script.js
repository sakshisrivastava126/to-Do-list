document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
    }
    updateTaskLists();
    updateStats();
})

let tasks = [];

const saveTasks = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () =>
{
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text : text, completed: false});
        taskInput.value = '';
        updateTaskLists();
        updateStats();
        saveTasks();
    }
    else{
        alert('Task cannot be empty');
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskLists();
    updateStats();
    saveTasks();
};

const deleteTask = (index) =>{
    tasks.splice(index,1);
    updateTaskLists();
    updateStats();
    saveTasks();
};

const editTask = (index) =>{
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index,1)
    updateTaskLists();
    updateStats();
    saveTasks();

};

const updateStats = () => {
    const completeTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = totalTasks === 0?0 : (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById('progressBar')

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;

}

const updateTaskLists = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Edit" class="editIcon" />
                <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" class="deleteIcon" />
            </div>
        </div>
        `;

        const editIcon = listItem.querySelector('.editIcon');
        const deleteIcon = listItem.querySelector('.deleteIcon');

        editIcon.addEventListener('click', () => editTask(index));
        deleteIcon.addEventListener('click', () => deleteTask(index));

        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));

        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click' , (e) =>{
    e.preventDefault();
    
    addTask();
});