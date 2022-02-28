sudo su -c "createuser -sdrPW $1" postgres
sudo su -c "createdb -h localhost -p 5432 -U $1 taskbox" postgres
