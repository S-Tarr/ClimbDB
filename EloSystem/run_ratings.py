import mysql.connector
from tqdm import tqdm

import os
from dotenv import load_dotenv
from calculate import update_multiple



# CREATE TABLE Ratings(
# 	Climber_ID INT,
#     Rating FLOAT(6, 2),
# 	FOREIGN KEY (Climber_ID) REFERENCES Climbers(id) ON DELETE CASCADE
# );

load_dotenv()

mydb = mysql.connector.connect(
  host=os.getenv('HOSTNAME'),
  user=os.getenv('SQL_USERNAME'),
  password=os.getenv('SQL_PASSWORD'),
  database=os.getenv('DATABASE_NAME'),
  port=os.getenv('SQL_PORT')
)

def evaluate_comp(comp_id: int, event_type: str):

    select_results = f"select Climber_ID, ClimberRank, Qualification, SemiFinal, Final from Results where WCC_ID=\"{comp_id}\" and EventType=\"{event_type}\""

    cursor = mydb.cursor()
    cursor.execute(select_results)

    results = cursor.fetchall()

    num_competitors = len(results)
    for result in results:
        climber_ID = result[0]
        ranked = result[1]

        select_rating = f"select Rating from Ratings where Climber_ID={climber_ID}"
        cursor.execute(select_rating)
        query_rating = cursor.fetchone()
        rating = query_rating[0]
        print("Ranked: " + str(ranked))
        new_rating = update_multiple(rating, num_competitors, ranked)
        print("Updated Rating: " + str(new_rating))
        update_rating = f"update Ratings set Rating={new_rating} where Climber_ID={climber_ID}"
        cursor.execute(update_rating)
    
    mydb.commit()


def run_comps():
    # get list of each event
    select_events = "select id, eventTime from Events"
    cursor = mydb.cursor()
    cursor.execute(select_events)

    events = cursor.fetchall()
    
    for event in events:
        comp_id = event[0]
        year = int(str(event[1]).split('-')[0])
        print(year)
        if (year > 2014):
            evaluate_comp(comp_id, "Boulder") 

    mydb.commit()
        
        

if __name__ == '__main__':
    # evaluate_comp(1233, 'Boulder')
    run_comps()