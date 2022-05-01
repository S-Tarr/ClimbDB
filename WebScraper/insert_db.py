import pickle
import mysql.connector
from tqdm import tqdm

import os
from dotenv import load_dotenv


from climber import Climber
from rank import Rank
from event import Event

load_dotenv()

mydb = mysql.connector.connect(
  host=os.getenv('HOSTNAME'),
  user=os.getenv('SQL_USERNAME'),
  password=os.getenv('SQL_PASSWORD'),
  database=os.getenv('DATABASE_NAME'),
  port=os.getenv('SQL_PORT')
)


def insert_climbers():
    pickle_in = open("climbers.pickle", "rb")
    climbers = pickle.load(pickle_in)

    mycursor = mydb.cursor()

    for climber in tqdm(climbers):
        sql = "INSERT IGNORE INTO Climbers (id, name, height, age, hometown) VALUES (%s, %s, %s, %s, %s)"
        val = (climber.id, climber.name.strip(), climber.height, climber.age, climber.hometown.strip())
        mycursor.execute(sql, val)
        sql = "INSERT IGNORE INTO Ratings (Climber_ID, Rating) VALUES (%s, %s)"
        val = (climber.id, 1500)
        mycursor.execute(sql, val)
    
    mydb.commit()
    

def insert_events_and_results():
    pickle_in = open("events.pickle","rb")
    baileys = pickle.load(pickle_in)
    mycursor = mydb.cursor()
    
    for bailey_event in tqdm(baileys):

        sql = "INSERT IGNORE INTO Events (id, location, eventTime) VALUES (%s, %s, %s)"
        val = (bailey_event.event_id, bailey_event.location, bailey_event.date)
        mycursor.execute(sql, val)
        
        rank = 1
        for result in bailey_event.results:
            
            if len(result) > 1:
                sqlResult = "INSERT IGNORE INTO Results (WCC_ID, Climber_ID, ClimberRank, Qualification, SemiFinal, Final, EventType) VALUES (%s, %s, %s, %s, %s, %s, %s);"
                valResult = (bailey_event.event_id, result[0], rank, "N/A", "N/A", result[1], bailey_event.event_type)
                if len(result) > 3:
                    valResult = (bailey_event.event_id, result[0], rank, result[1], result[2], result[3], bailey_event.event_type)
                elif len(result) > 2:
                    valResult = (bailey_event.event_id, result[0], rank,"N/A", result[1], result[2], bailey_event.event_type)
                
                mycursor.execute(sqlResult, valResult)
                rank += 1
            
    mydb.commit()


def insert_ranks():
    pickle_in = open("ranks.pickle", "rb")
    rankings = pickle.load(pickle_in)

    mycursor = mydb.cursor()

    for ranks in tqdm(rankings):
        for rank in ranks:
            sql = "INSERT IGNORE INTO Ranks (ClimberRank, ClimberID, Points, EventType, SYear) VALUES (%s, %s, %s, %s, %s)"
            val = (rank.climber_rank, rank.id, rank.points, rank.event_type, rank.year)
            mycursor.execute(sql, val)
    
    mydb.commit()

if __name__ == '__main__':
    insert_climbers()
    #insert_events_and_results()
    # insert_ranks()
    mydb.close()