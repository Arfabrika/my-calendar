from task import Task

taskFileName = "tasks.txt"

def findTask(task: Task):
    f = open(taskFileName, "r")
    lines = f.readlines()
    taskAsArr = [value for value in task.__dict__.values()]
    for line in lines:
        taskData = line.split()
        if taskData == taskAsArr:
            f.close()
            return True
    f.close()
    return False

def saveTask(task: Task):
    if not findTask(task):
        taskAsArr = [value for value in task.__dict__.values()]
        f = open(taskFileName, "a")
        f.write(" ".join(taskAsArr) + "\n")
        f.close()
        return True
    return False

def getAllTasks():
    f = open(taskFileName, "r")
    lines = f.readlines()
    tasks = []
    for line in lines:
        taskData = line.split()
        curTask = Task()
        curTask.name = taskData[0]
        curTask.deadline = taskData[1]
        tasks.append(curTask)
    f.close()
    return tasks