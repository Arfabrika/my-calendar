class Task:
    def __init__(self, task) -> None:
        self.id = task['id']
        self.name = task['name']
        self.deadline = task['deadline']