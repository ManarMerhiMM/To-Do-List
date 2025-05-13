//capturing elements here globally so I don't have to do it each time, improves readability
let taskUL = document.getElementById("taskList");
let taskInput = document.getElementById("taskDescription");
let modal = document.getElementById("modal");
let modalContainer = document.getElementById("modalContainer");

function displayTasks() { //displays tasks currently in localStorage showcasing completion status as well
    let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    taskUL.innerHTML = "<h2>Task Log</h2>";

    for (let i = 0; i < curTaskList.length; i++) {
        let newLi = document.createElement("li");
        newLi.innerHTML = `<p class='taskDescriptions'>${curTaskList[i].description}</p> <div class='alignmentContainersInLis'><input type='checkbox' class='markAsDoneChecks' data-taskid='${curTaskList[i].id}'><button class='editBtns' data-taskid='${curTaskList[i].id}'>Edit</button> <button class='deleteBtns' data-taskid='${curTaskList[i].id}'>Remove</button></div>`;
        let checkbox = newLi.querySelector("input[type='checkbox']");
        checkbox.checked = curTaskList[i].completed;

        let p = newLi.querySelector("p");
        p.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

        newLi.style.backgroundColor = checkbox.checked ? 'rgb(41, 202, 89)' : 'rgb(202, 46, 41)';
        taskUL.appendChild(newLi);
    }

    //this is added here to ensure every delete button is loaded before you can stick an event listener to it (same will be done to checkboxes that say hey this is done now) and also the same thing for the edit buttons
    document.querySelectorAll(".deleteBtns").forEach(btn => btn.addEventListener("click", (event) => {
        let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
        let taskToBeDeleted = curTaskList.find(task => task.id === event.target.dataset.taskid);

        deleteTask(taskToBeDeleted);
    }));

    document.querySelectorAll(".markAsDoneChecks").forEach(checkbox => checkbox.addEventListener("change", (event) => {
        let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
        let taskToBeMarked = curTaskList.find(task => task.id === event.target.dataset.taskid);

        completeTask(taskToBeMarked, checkbox);
    }));

    document.querySelectorAll(".editBtns").forEach(btn => btn.addEventListener("click", (event) => {
        let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
        let taskToBeEdited = curTaskList.find(task => task.id === event.target.dataset.taskid);

        modal.style.display = "flex";
        modalContainer.style.display = "flex";
        document.getElementById("editDescription").value = taskToBeEdited.description;
        document.getElementById("modalOkay").dataset.taskid = taskToBeEdited.id;
    }));
}

document.addEventListener("DOMContentLoaded", displayTasks); //when we load the page we want the current tasks to be retrieved and displayed

function addTask(task) { //adds a new task to the localstorage
    let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    curTaskList.push(task);
    localStorage.setItem("taskList", JSON.stringify(curTaskList));
    displayTasks();
}

function deleteTask(task) { //deletes a given task from localstorage
    let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    curTaskList.splice(curTaskList.findIndex(curtask => curtask.id === task.id), 1);
    localStorage.setItem("taskList", JSON.stringify(curTaskList));

    displayTasks();
}

function completeTask(task, checkboxElement) {
    let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let index = curTaskList.findIndex(curtask => curtask.id === task.id);
    curTaskList[index].completed = !curTaskList[index].completed;

    localStorage.setItem("taskList", JSON.stringify(curTaskList));

    let li = checkboxElement.closest("li");
    li.style.backgroundColor = curTaskList[index].completed ? 'rgb(41, 202, 89)' : 'rgb(202, 46, 41)';

    let taskDescription = li.querySelector('.taskDescriptions');
    taskDescription.style.textDecoration = curTaskList[index].completed ? 'line-through' : 'none';
}

function editTask(task) {
    let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let index = curTaskList.findIndex(curtask => curtask.id === task.id);

    if (document.getElementById("editDescription").value.trim() != "") {
        curTaskList[index].description = document.getElementById("editDescription").value.trim();
        localStorage.setItem("taskList", JSON.stringify(curTaskList));
        alert("Successful edit!");
    }
    else{
        alert("No empty tasks are allowed!");
    }


    modal.style.display = "none";
    modalContainer.style.display = "none";
    displayTasks(); //redisplaying is easier than real time change and it does not make a difference to the user!
}

document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (taskInput.value == "") {
        alert("You must describe your task!");
    }
    else {
        let newTask = { id: crypto.randomUUID(), description: '', completed: false }; //adding a 100% unique id for each task so it can be properly retrieved 100% of the time for editing/deleting etc...
        newTask.description = taskInput.value.trim();

        taskInput.value = "";
        addTask(newTask);
    }
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
    modal.style.display = "none";
    modalContainer.style.display = "none";
});

modalContainer.addEventListener("click", () => {
    modal.style.display = "none";
    modalContainer.style.display = "none";
});

modal.addEventListener("click", (event) => {
    event.stopPropagation();
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
    modalContainer.style.display = "none";
});

document.getElementById("modalOkay").addEventListener("click", (event) => {
    let curTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let taskToBeEdited = curTaskList.find(task => task.id === event.target.dataset.taskid);
    editTask(taskToBeEdited);
});