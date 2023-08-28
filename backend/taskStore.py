from file import *

class TaskStore:
    def __init__(self) -> None:
        self.taskFileName = "tasks.txt"
        self.loadTasks()

    def addTask(self, task):
        if not self.isTaskInStore(task):
            self.tasks.append(task)
            return True
        return False

    def loadTasks(self):
        self.tasks = loadTasksFromTXT(self.taskFileName)

    def saveTasks(self):
        return saveTasks(self.tasks, self.taskFileName)

    def isTaskInStore(self, task):
        if task in self.tasks:
            return True
        return False

    def findTasksByName(self, name):
        res = []
        for i, task in enumerate(self.tasks):
            if task.name == name:
                res.append(i)
        return res

    def editTasksByName(self, name, newTask):
        tasks = self.findTasksByName(name)
        if len(tasks) == 0:
            return -1
        for ind in tasks:
            self.tasks[ind].name = newTask['name']
            self.tasks[ind].deadline = newTask['deadline']
        return 1

    def getTasks(self):
        return self.tasks

    def deleteTasksByName(self, name):
        tasks = self.findTasksByName(name)
        if len(tasks) == 0:
            return -1
        for ind in sorted(tasks, reverse=True):
            del self.tasks[ind]
        return 1

    def __del__(self):
        self.saveTasks()
