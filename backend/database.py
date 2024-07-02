import psycopg2
from psycopg2 import Error

def saveToPostgres(self):
        try:
            connection = psycopg2.connect(user="postgres", password="123",
                                    host="127.0.0.1", port="5432",
                                    database="train-logistic")
        except (Exception, Error) as error:
            print("Ошибка при инициализации PostgreSQL", error)
        cursor = connection.cursor()
        for row in data:
            if (len(row) < len(self.unloadStTitle)):
                row.extend(['null'] * (len(self.unloadStTitle) - len(row)))
            insert_query = f'''INSERT INTO {translitName}(date, oil_cnt, track1, track1_unload, track2, track2_unload, track3, track3_unload) VALUES('{row[0]}', {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}');'''
            cursor.execute(insert_query)
            connection.commit()
        cursor.close()
        connection.close()w.