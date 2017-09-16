#!/bin/sh

heroku pg:reset postgresql-tapered-82468

DB_FILE="todo_db.sql"

psql -f $DB_FILE --set=db_user=$DB_USER
