async function createTask(userName, userAge) {
  
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: userName,
            deadline: userAge
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        document.getElementById("tmp").innerHTML = user.mes;
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

document.getElementById("submit").addEventListener("click", async () => {
     
     const name = document.getElementById("name").value;
     const deadline = document.getElementById("deadline").value;
     await createTask(name, deadline);

 });

 window.onload = function() {
    document.getElementById("tasktbl").style.visibility = "hidden"
 }

 document.getElementById("getTasks").addEventListener("click", async () => {
    await getAllTasks();
});

 async function getAllTasks() {
    const response = await fetch("/api/tasks", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });
    if (response.ok === true) {
        const taskArrJson = await response.json();
        console.log(taskArrJson);
        taskArr = taskArrJson.tasks;
        document.getElementById('tasktbl').getElementsByTagName('tbody')[0].innerHTML = ""
        var tbodyRef = document.getElementById('tasktbl').getElementsByTagName('tbody')[0];
        for (task of taskArr) {
            var newRow = tbodyRef.insertRow();
            var newCell = newRow.insertCell();
            var newText = document.createTextNode(task.name);
            newCell.appendChild(newText);

            newCell = newRow.insertCell();
            newText = document.createTextNode(task.deadline);
            newCell.appendChild(newText);
        }
        document.getElementById("tasktbl").style.visibility = 'visible'
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}


