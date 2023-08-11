from fastapi import *
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from task import Task
from file import *
import json

app = FastAPI()
app.mount('/static', StaticFiles(directory='public', html=True), name='static')

arr = []

@app.get("/tasks")
def showMain():
    return FileResponse("./public/tasks/newTask.html")

@app.get("/api/tasks")
def getTasks():
    arr = getAllTasks()
    jsonarr = []
    for task in arr:
        jsonarr.append({"name": task.name, "deadline": task.deadline})
    return {"tasks": jsonarr}
    

@app.post("/api/tasks")
def addTask(task: Task):    
    if (saveTask(task)):
        arr = getAllTasks()
        return {"mes": "OK"}
    return {"mes": "ERROR"}