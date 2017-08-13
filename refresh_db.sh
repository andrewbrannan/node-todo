#!/bin/bash

DB_NAME="todo"
DB_FILE="todo_db.sql"

echo "Removing database $DB_NAME (if it exists)..."
dropdb $DB_NAME &> /dev/null

echo "Recreating database $DB_NAME..."
createdb todo &> /dev/null
psql -d $DB_NAME -f $DB_FILE &> /dev/null

printf "Checking db created..."
if [ "$( psql $DB_NAME -tAc "SELECT 1 FROM pg_database WHERE DATNAME='$DB_NAME'" )" = '1' ]
then
  echo "SUCCESS"
else
  echo "FAIL"
fi
