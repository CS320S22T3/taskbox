createuser -sdrPW $1
createdb -h localhost -p 5432 -U $1 taskbox
