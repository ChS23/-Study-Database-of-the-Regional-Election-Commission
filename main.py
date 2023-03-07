from mysql.connector import connect, Error

cnx = connect(user='root', password='1234qwer', host='localhost', database='elections', use_pure=False)

cursor = cnx.cursor(buffered=True)

cnx.commit()
print(cursor.execute('SELECT * FROM elections.vibor;'))

cnx.close()