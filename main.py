from fastapi import *
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from task import Task
from taskStore import TaskStore

app = FastAPI()
app.mount('/static', StaticFiles(directory='public', html=True), name='static')

taskStore = None

@app.get("/tasks")
def showMain():
    global taskStore
    if taskStore is None:
        taskStore = TaskStore()
    return FileResponse("./public/tasks/newTask.html")

@app.get("/api/tasks")
def getTasks():
    arr = taskStore.getTasks()
    jsonarr = []
    for task in arr:
        jsonarr.append({"name": task.name, "deadline": task.deadline})
    return {"tasks": jsonarr}
    

@app.post("/api/tasks")
def addTask(data = Body()):
    if (taskStore.addTask(Task(data))):
        return {"mes": "OK"}
    return {"mes": "ERROR"}

@app.put("/api/tasks")
def editTask(data = Body()):
    response = taskStore.editTasksByName(data['oldName'], data['newTask'])
    if response == 1:
        return {"mes": "Ok"}
    return {"mes": "Не найдено задач с указанным названием"}

@app.delete("/api/tasks/{name}")
def deleteTask(name):
    response = taskStore.deleteTasksByName(name)
    if response == 1:
        return {"mes": "Ok"}
    return {"mes": "Не найдено задач с указанным названием"}