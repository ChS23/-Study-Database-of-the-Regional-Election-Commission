-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: elections
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `political_party`
--

DROP TABLE IF EXISTS `political_party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `political_party` (
  `party_id` int NOT NULL AUTO_INCREMENT,
  `name_party` varchar(60) NOT NULL,
  `full_name_of_the_Chairman` varchar(70) NOT NULL,
  `location` varchar(100) NOT NULL,
  PRIMARY KEY (`party_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `political_party`
--

LOCK TABLES `political_party` WRITE;
/*!40000 ALTER TABLE `political_party` DISABLE KEYS */;
INSERT INTO `political_party` VALUES (1,'Единая Россия','Дмитрий Медведев','ул. Ленина, д. 60, г. Волгоград, 400005'),(2,'КПРФ','Геннадий Зюганов','ул. Советская, д. 4, г. Волгоград, 400066'),(3,'ЛДПР','Леонид Слуцкий','ул. Советская, д. 33, г. Волгоград, 400131'),(4,'Справедливая Россия','Сергей Миронов','ул. Александровская, д. 2, г. Волгоград, 400066'),(5,'Яблоко','Николай Рыбаков','ул. Вознесенская, д. 24, г. Волгоград, 400005'),(6,'Партия Роста','Борис Титов','ул. Кирова, д. 19, г. Волгоград, 400005'),(7,'Партия Великое Отечество','Сергей Харитонов','ул. Советская, д. 11, г. Волгоград, 400131'),(8,'Народная партия','Максим Сурайкин','ул. Краснознаменная, д. 17, г. Волгоград, 400005'),(9,'Российская объединенная демократическая партия','Николай Левичев','ул. Советская, д. 11, г. Волгоград, 400131');
/*!40000 ALTER TABLE `political_party` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-23 16:26:45
