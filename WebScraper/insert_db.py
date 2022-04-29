import pickle
import mysql.connector

from climber import Climber

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="helloworld",
  database="testapp",
  port="3308"
)


def insert_climbers():
    pickle_in = open("climbers.pickle", "rb")
    climbers = pickle.load(pickle_in)

    mycursor = mydb.cursor()

    for climber in climbers:
        sql = "INSERT IGNORE INTO Climbers (id, name, height, age, hometown) VALUES (%s, %s, %s, %s, %s)"
        val = (climber.id, climber.name, climber.height, climber.age, climber.hometown)
        mycursor.execute(sql, val)
    
    mydb.commit()
    

def insert_events_and_results():
    pickle_in = open("events.pickle","rb")
    baileys = pickle.load(pickle_in)
    mycursor = mydb.cursor()
    
    insert_climbers()

    for bailey_event in baileys:

        sql = "INSERT IGNORE INTO Events (id, eventTime) VALUES (%s, %s)"
        val = (bailey_event.event_id, bailey_event.date)
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


if __name__ == '__main__':
    insert_climbers()
    insert_events_and_results()
    mydb.close()