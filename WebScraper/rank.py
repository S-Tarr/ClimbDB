from dataclasses import dataclass
from datetime import datetime


@dataclass
class Rank:
    id: str
    climber_rank: int
    points: float
    event_type: str
    year: int

