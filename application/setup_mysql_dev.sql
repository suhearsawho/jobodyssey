-- Creates database jo_dev_db
CREATE DATABASE IF NOT EXISTS jo_dev_db;
USE jo_dev_db;
CREATE USER IF NOT EXISTS 'jo_dev'@'localhost';
SET PASSWORD FOR 'jo_dev'@'localhost' = 'jo_dev_pwd';
GRANT ALL PRIVILEGES ON jo_dev_db.* TO 'jo_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'jo_dev'@'localhost';
