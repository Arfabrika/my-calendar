from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from taskStore import TaskStore
from task import Task

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

#app.mount('/static', StaticFiles(directory='public', html=True), name='static')

taskStore = None

# @app.get("/tasks")
# def showMain():
   
#     return FileResponse("./public/tasks/newTask.html")

@app.get("/api/tasks")
def getTasks():
    global taskStore
    if taskStore is None:
        taskStore = TaskStore()
    arr = taskStore.getTasks()
    jsonarr = []
    for task in arr:
        jsonarr.append({"id": task.id, "name": task.name, "deadline": task.deadline})
    return {"tasks": jsonarr}

@app.post("/api/tasks")
def addTask(data = Body()):
    print(data['task'])
    if (taskStore.addTask(Task(data['task']))):
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