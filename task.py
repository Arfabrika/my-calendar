from pydantic import BaseModel, Field

class Task(BaseModel):
    name: str = Field(default="defname")
    deadline: str = Field(default="00.00.0000")
