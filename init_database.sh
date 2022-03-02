sudo -u postgres createuser -sdrPW $1
sudo -u postgres createdb -h localhost -p 5432 -U $1 taskbox
