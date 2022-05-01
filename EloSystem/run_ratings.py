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
    # sql_select_Query = "select * from Laptop"
    # cursor = connection.cursor()
    # cursor.execute(sql_select_Query)
    # # get all records
    # records = cursor.fetchall()
    # print("Total number of rows in table: ", cursor.rowcount)

    # print("\nPrinting each row")
    # for row in records:
    #     print("Id = ", row[0], )
    #     print("Name = ", row[1])
    #     print("Price  = ", row[2])
    #     print("Purchase date  = ", row[3], "\n")

    select_results = f"select Climber_ID, Qualification, SemiFinal, Final from Results where WCC_ID=\"{comp_id}\" and EventType=\"{event_type}\""

    cursor = mydb.cursor()
    cursor.execute(select_results)

    results = cursor.fetchall()

    num_competitors = len(results)
    for result in results:
        # print("Climber_ID: " + str(result[0]))
        select_rating = f"select Rating from Ratings where Climber_ID={results[0][0]}"
        query_rating = cursor.fetchone()
        # rating = query_rating[0]
        print(query_rating)
        # print(rating)
        # new_rating = update_multiple()
        


if __name__ == '__main__':
    evaluate_comp(1233, 'Boulder')