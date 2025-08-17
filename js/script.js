const inputField = document.querySelector(".input-field textarea"),
    todoLists = document.querySelector(".todoLists"),
    pendingNum = document.querySelector(".pending-num"),
    clearButton = document.querySelector(".clear-button");

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let tasks = getTasks();
    todoLists.innerHTML = "";

    tasks.forEach((task, index) => {
        let liTag = `
        <li class="list ${task.completed ? "" : "pending"}" onclick="handleStatus(${index})">
          <input type="checkbox" ${task.completed ? "checked" : ""}/>
          <span class="task">${task.name}</span>
          <i class="uil uil-trash" onclick="deleteTask(${index})"></i>
        </li>`;
        todoLists.insertAdjacentHTML("beforeend", liTag);
    });

    let pendingTasks = tasks.filter(task => !task.completed).length;
    pendingNum.textContent = pendingTasks === 0 ? "no" : pendingTasks;

    clearButton.style.pointerEvents = tasks.length > 0 ? "auto" : "none";
}
renderTasks();

inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim();
    if (e.key === "Enter" && inputVal.length > 0) {
        let tasks = getTasks();
        tasks.push({ name: inputVal, completed: false });
        saveTasks(tasks);
        inputField.value = "";
        renderTasks();
    }
});

function handleStatus(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

clearButton.addEventListener("click", () => {
    localStorage.removeItem("tasks");
    renderTasks();
});
