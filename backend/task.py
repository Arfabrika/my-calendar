class Task:
    def __init__(self, task) -> None:
        self.id = int(task['id'])
        self.name = task['name']
        self.deadline = task['deadline']