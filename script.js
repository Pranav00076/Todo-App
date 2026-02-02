let todos = [];
let editingId = null;

const inputtext = document.getElementById("input");
const dateinput = document.getElementById("dateinput");
const addbtn = document.getElementById("add");
const pending = document.getElementById("pending");
const compllist = document.getElementById("compllist");
const errormsg = document.getElementById("error");
const sreachinput = document.getElementById("search");

let allLabels = ["Work", "Personal", "Study"];
let activeFilter = null;

// ---------------- LABEL SYSTEM ----------------

function addLabel() {
  const input = document.getElementById("newlabel");
  const value = input.value.trim();

  if (value && !allLabels.includes(value)) {
    allLabels.push(value);
    renderLabels();
  }
  input.value = "";
}

function renderLabels() {
  const labelsDiv = document.getElementById("labels");
  labelsDiv.innerHTML = "";

  allLabels.forEach((label) => {
    let span = document.createElement("span");
    span.className = "label-pill";
    span.innerText = label;

    if (activeFilter === label) {
      span.classList.add("active");
    }

    span.onclick = () => toggleFilter(label);
    labelsDiv.appendChild(span);
  });
}

function toggleFilter(label) {
  if (activeFilter === label) {
    activeFilter = null;
  } else {
    activeFilter = label;
  }
  renderTodos();
}

// ---------------- TODO SYSTEM ----------------

function takeAction() {
  if (editingId === null) {
    addtodo();
  } else {
    saveUpdate();
  }
}

function addtodo() {
  if (inputtext.value == "") {
    errormsg.innerHTML = "The Todo Task can not be Empty.";
  } else if (dateinput.value == "") {
    errormsg.innerHTML = "Please select a due date.";
  } else {
    errormsg.innerHTML = "";

    let obj = {
      name: inputtext.value,
      completed: false,
      due: dateinput.value,
      labels: activeFilter ? [activeFilter] : [],
      id: Date.now(),
    };

    todos.push(obj);
    renderTodos();
    inputtext.value = "";
  }
}

function updateTodo(id) {
  let todo = todos.find((t) => t.id === id);
  inputtext.value = todo.name;
  editingId = id;
  addbtn.innerHTML = "Update";
}

function saveUpdate() {
  let todo = todos.find((t) => t.id === editingId);
  todo.name = inputtext.value;
  editingId = null;
  addbtn.innerHTML = "ADD";
  inputtext.value = "";
  renderTodos();
}

function deletetodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

function changeStatus(id) {
  let todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed;
  renderTodos();
}

// ---------------- RENDER ----------------

function renderTodos() {
  pending.innerHTML = "";
  compllist.innerHTML = "";

  let filtered = activeFilter
    ? todos.filter((t) => t.labels.includes(activeFilter))
    : todos;

  for (let todo of filtered) {
    let li = document.createElement("li");
    li.innerHTML = `
        <span>${todo.name}</span>
        <span class="todo-label">${todo.labels.join(", ") || "No label"}</span>
        <span>${todo.due}</span>
        <button onclick="changeStatus(${todo.id})">${todo.completed ? "✅" : "⏳"}</button>
        <button onclick="updateTodo(${todo.id})">Update</button>
        <button onclick="deletetodo(${todo.id})">Delete</button>`;

    if (todo.completed) {
      compllist.appendChild(li);
    } else {
      pending.appendChild(li);
    }
  }

  renderLabels();
}

// ---------------- SEARCH ----------------

sreachinput.addEventListener("input", () => {
  const query = sreachinput.value.toLowerCase();
  const items = document.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    let text = items[i].innerText.toLowerCase();
    items[i].style.display = text.includes(query) ? "flex" : "none";
  }
});

renderLabels();
