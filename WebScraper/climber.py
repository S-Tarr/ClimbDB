from dataclasses import dataclass
from datetime import datetime


@dataclass
class Climber:
    id: str
    name: str
    age: int
    height: int
    hometown: str
