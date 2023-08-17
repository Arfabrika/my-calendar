async function createTask(name, deadline) {
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            deadline: deadline
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

document.getElementById("openCreate").addEventListener("click", async () => {
    document.getElementById("editModule").style.display = "none"
    document.getElementById("deleteModule").style.display = "none"
    document.getElementById("createModule").style.display = "block"
 });

document.getElementById("submit").addEventListener("click", async () => {
     const name = document.getElementById("name").value;
     const deadline = document.getElementById("deadline").value;
     await createTask(name, deadline);
 });