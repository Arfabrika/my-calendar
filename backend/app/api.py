from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

taskStore = TaskStore()

@app.get("/api/tasks")
def getTasks():
    arr = taskStore.getTasks()
    jsonarr = []
    for task in arr:
        jsonarr.append({"id": task.id, "name": task.name, "deadline": task.deadline})
    return {"tasks": jsonarr}

@app.post("/api/tasks")
def addTask(data = Body()):
    print(data)
    if (taskStore.addTask(Task(data['task']))):
        return {"message": "OK"}
    return JSONResponse(content={"message": "Ошибка при добавлении задачи"}, status_code=400)

@app.put("/api/tasks")
def editTask(data = Body()):
    response = taskStore.editTasksById(int(data['id']), data['task'])
    if response == 1:
        return {"message": "Ok"}
    return JSONResponse(content={"message": "Указанная задача не найдена"}, status_code=404)

@app.delete("/api/tasks/{id}")
def deleteTask(id):
    response = taskStore.deleteTasksById(int(id))
    if response == 1:
        return {"message": "Ok"}
    return JSONResponse(content={"message": "Указанная задача не найдена"}, status_code=404)