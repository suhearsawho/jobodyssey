-- MySQL dump 10.13  Distrib 5.7.8-rc, for Linux (x86_64)
--
-- Host: localhost    Database: jo_dev_db
-- ------------------------------------------------------
-- Server version	5.7.8-rc

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Drop database
DROP DATABASE IF EXISTS jo_dev_db;

-- Create database + user if doesn't exist
CREATE DATABASE IF NOT EXISTS jo_dev_db;
CREATE USER IF NOT EXISTS 'jo_dev'@'localhost';
SET PASSWORD FOR 'jo_dev'@'localhost' = 'jo_dev_pwd';
GRANT ALL ON jo_dev_db.* TO 'jo_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'jo_dev'@'localhost';
FLUSH PRIVILEGES;

USE jo_dev_db;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rewards` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(128) NOT NULL,
  `rarity` varchar(60) NOT NULL DEFAULT 'COMMON',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES ('0','2017-03-25 02:17:06','2017-03-25 02:17:06','Raven the Cat', 'ULTRA RARE'),('1','2017-03-25 02:17:06','2017-03-25 02:17:06','Hope the Cat', 'ULTRA RARE'),('2','2017-03-25 02:17:06','2017-03-25 02:17:06','Durfy the Dog', 'SUPER RARE'),('3','2017-03-25 02:17:06','2017-03-25 02:17:06','Poppy the Puppy', 'RARE'),('4','2017-03-25 02:17:06','2017-03-25 02:17:06','Smart Susan', 'COMMON');
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_reward`
--

DROP TABLE IF EXISTS `user_reward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_reward` (
  `user_id` varchar(60) NOT NULL,
  `reward_id` varchar(60) NOT NULL,
  PRIMARY KEY (`user_id`,`reward_id`),
  KEY `reward_id` (`reward_id`),
  CONSTRAINT `user_reward_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_reward_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `rewards` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_reward`
--

LOCK TABLES `user_reward` WRITE;
/*!40000 ALTER TABLE `user_reward` DISABLE KEYS */;
INSERT INTO `user_reward` VALUES ('susansu1995', '0'), ('susansu1995', '2'), ('susansu1995', '3'), ('chrischoe1991', '0'), ('chrischoe1991', '1'), ('chrischoe1991', '3'), ('chrischoe1991', '4');
/*!40000 ALTER TABLE `user_reward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `level_id` varchar(60) NOT NULL,
  `user_name` varchar(128) NOT NULL,
  `currency` int(11) NOT NULL DEFAULT 0,
  `jobs_applied` JSON DEFAULT NULL,
  `jobs_interested` JSON DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `level_id` (`level_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('susansu1995','2017-03-25 02:17:06','2017-03-25 02:17:06', '103', 'suhearsawho', '999', '{"name": "suhearsawho", "data": [{"date": "10-22-1991", "company": "Google", "url": "www.google.com", "title": "super software engineer Susan Su!", "address": "123 Google Dr", "notes": "susan will work here"}, {"date": "10-22-1991", "company": "Best Company", "url": "www.susansu.com", "title": "Principal SWE", "address": "12 Susan Su", "notes": "susan will work here two"}, {"date": "8-8-1995", "company": "LinkedIn", "url": "www.google.com", "title": "senior software engineer!", "address": "123 Somewhere Sunnyvale", "notes": "susan will work here three"}]}', '{"name": "suhearsawho", "data": [{"date": "10-22-1991", "company": "Google", "url": "www.google.com", "title": "interested", "address": "123 Google Dr", "notes": "interested"}, {"date": "8-8-1995", "company": "FaceBook", "url": "www.facebook.com", "title": "Senior SRE", "address": "123 Facebook Circle", "notes": "me an SRE? unpossible"}]}'),('chrischoe1991','2017-03-25 02:17:06','2017-03-25 02:17:06', '100', 'christopherchoe', '1', '{}', '{}');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levels` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES ('100','2017-03-25 02:17:06','2017-03-25 02:17:06','Intern/Apprentice'),('101','2017-03-25 02:17:06','2017-03-25 02:17:06','Entry/Junior'),('102','2017-03-25 02:17:06','2017-03-25 02:17:06','Mid/SWE'),('103','2017-03-25 02:17:06','2017-03-25 02:17:06','Senior');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-25 18:45:25
