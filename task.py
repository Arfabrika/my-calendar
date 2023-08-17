class Task:
    def __init__(self, task) -> None:
        self.name = task['name']
        self.deadline = task['deadline']