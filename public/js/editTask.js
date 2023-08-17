document.getElementById("openEdit").addEventListener("click", async () => {
    document.getElementById("createModule").style.display = "none"
    document.getElementById("deleteModule").style.display = "none"
    document.getElementById("editModule").style.display = "block"
});

document.getElementById("submitEdit").addEventListener("click", async () => {
    const oldName = document.getElementById("oldName").value
    const name = document.getElementById("nameEdit").value;
    const deadline = document.getElementById("deadlineEdit").value;
    const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            oldName: oldName,
            newTask: {
                name: name,
                deadline: deadline
            }
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
});