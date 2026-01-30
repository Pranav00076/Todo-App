let todos = []
let editingId = null;

const inputtext = document.getElementById("input");
const addbtn = document.getElementById("add")
const pending = document.getElementById("pending");
const compllist = document.getElementById("compllist")
const errormsg = document.getElementById("error");

function takeAction(){
    if (editingId === null) {
        addtodo()
    } else {
        saveUpdate()
    }
}
function addtodo(){
    if (inputtext.value == ""){
        errormsg.innerHTML = "The Todo Task can not be Empty."
    } else{
        errormsg.innerHTML = "";
        let obj = {};
        obj["name"] = inputtext.value 
        obj["completed"] = false;
        obj["id"] = Date.now()
        todos.push(obj)
        renderTodos()
        inputtext.value ="";
    }
}
function updateTodo(id){
    let todo = todos.find(t => t.id === id)
    inputtext.value = todo.name
    editingId = id
    addbtn.innerHTML = "Update"
}

function saveUpdate(){
    let todo = todos.find(t => t.id === editingId)
    todo.name = inputtext.value
    editingId = null
    addbtn.innerHTML = "ADD"
    inputtext.value = ""
    renderTodos()
}

function deletetodo(id){
    for (let i=0; i<todos.length; i++){
        let todo = todos[i]
        if (todo.id == id){
            todos.splice(i,1)
            break
        }
    }
    renderTodos()
}
function changeStatus(id){
    for (let i=0; i<todos.length; i++){
        let todo = todos[i]
        if (todo.id == id){
            if (todo.completed == false){
                todo.completed = true
            } else{
                todo.completed = false
            }
        }
    }
    renderTodos()
}
function renderTodos(){
    pending.innerHTML = ""
    compllist.innerHTML = ""
    for (let todo of todos){
        let li = document.createElement("li")
        li.innerHTML = `
        <span>${todo.name}</span>
        <button onclick="changeStatus(${todo.id})">${todo.completed ? "✅" : "⏳"}</button>
        <button onclick="updateTodo(${todo.id})">Update</button>
        <button onclick="deletetodo(${todo.id})">Delete</button>`
        if (todo.completed == true){
            compllist.appendChild(li)
        } else{
            pending.appendChild(li)
        }
    }
}
