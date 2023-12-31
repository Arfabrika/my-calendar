import io
from task import Task

def saveTasks(tasks: [], taskFileName: str):
    try:
        f = io.open(taskFileName, "w")
        for task in tasks:
            taskAsArr = [str(value) for value in task.__dict__.values()]
            f.write(" ".join(taskAsArr) + "\n")
        f.close()
    except Exception as e:
        print(str(e))
        f.close()
        return False
    return True

def loadTasksFromTXT(taskFileName: str):
    f = open(taskFileName, "r")
    lines = f.readlines()
    tasks = []
    for line in lines:
        taskData = line.split()
        curTask = Task({"id": taskData[0], "name": taskData[1], "deadline": taskData[2]})
        tasks.append(curTask)
    f.close()
    return tasks