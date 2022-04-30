from dataclasses import dataclass
from datetime import datetime
import csv


@dataclass
class Event:
    event_id: int
    result_id: int
    event_type: str
    location: str
    date: datetime | None = None
    results: list[tuple[str, ...]] | None = None

    def to_csv(self, filename=None):
        if not self.results:
            raise Exception('Attempting to write event without result info to csv')

        if not filename:
            datestr = f'{datetime.strftime(self.date, "%Y%m%d")}'
            filename = f'events/{datestr}-{self.event_id}-{self.result_id}.csv'

        scores = len(self.results[0]) - 1
        with open(filename, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(('user_id', *[f'score{i}' for i in range(scores)]))
            writer.writerows(self.results)
            