const task = document.getElementById("textInput")
const add = document.getElementById("add")
const bigdiv = document.getElementById("tasks")
const error = document.getElementById("msg")

add.addEventListener("click", (e) => {
    e.preventDefault()
    if (task.value != ""){
    const newdiv = document.createElement("div");
    newdiv.innerHTML = task.value 
    bigdiv.appendChild(newdiv)
    task.value = ""
    msg.innerHTML = ""
    } else {
        msg.innerHTML = "Field cannot be empty."
    }
})