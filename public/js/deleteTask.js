document.getElementById("openDelete").addEventListener("click", async () => {
    document.getElementById("createModule").style.display = "none"
    document.getElementById("editModule").style.display = "none"
    document.getElementById("deleteModule").style.display = "block"
});

document.getElementById("submitDelete").addEventListener("click", async () => {
    const name = document.getElementById("nameDelete").value;
    const response = await fetch(`/api/tasks/${name}`, {
        method: "DELETE",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
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