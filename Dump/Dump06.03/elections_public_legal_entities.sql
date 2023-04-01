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
-- Table structure for table `public_legal_entities`
--

DROP TABLE IF EXISTS `public_legal_entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_legal_entities` (
  `public_legal_entitie_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(80) NOT NULL,
  `number` int NOT NULL,
  PRIMARY KEY (`public_legal_entitie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20078 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public_legal_entities`
--

LOCK TABLES `public_legal_entities` WRITE;
/*!40000 ALTER TABLE `public_legal_entities` DISABLE KEYS */;
INSERT INTO `public_legal_entities` VALUES (20040,'Алексеевский муниципальный район\n',838927),(20041,'Быковский муниципальный район',879528),(20042,'Городищенский муниципальный район\n',766615),(20043,'Городской округ - город Волжский',916736),(20044,'Городской округ - город Камышин\n',440988),(20045,'Городской округ - город Михайловка',704321),(20046,'Городской округ - город Урюпинск',532331),(20047,'Городской округ - город Фролово\n',707326),(20048,'Городской округ город-герой Волгоград\n',578204),(20049,'Даниловский муниципальный район\n',604446),(20050,'Дубовский муниципальный район',725720),(20051,'Еланский муниципальный район\n',586813),(20052,'Жирновский муниципальный район\n',869690),(20053,'Иловлинский муниципальный район',590853),(20054,'Калачевский муниципальный район\n',436213),(20055,'Камышинский муниципальный район\n',495216),(20056,'Киквидзенский муниципальный район\n',996370),(20057,'Клетский муниципальный район\n',877980),(20058,'Котельниковский муниципальный район\n',401561),(20059,'Котовский муниципальный район',577858),(20060,'Кумылженский муниципальный район\n',717067),(20061,'Ленинский муниципальный район\n',916290),(20062,'Нехаевский муниципальный район\n',540489),(20063,'Николаевский муниципальный район\n',555366),(20064,'Новоаннинский муниципальный район\n',739962),(20065,'Новониколаевский муниципальный район\n',680093),(20066,'Октябрьский муниципальный район',977478),(20067,'Ольховский муниципальный район\n',502192),(20068,'Палласовский муниципальный район\n',584849),(20069,'Руднянский муниципальный район',891070),(20070,'Светлоярский муниципальный район\n',773157),(20071,'Серафимовичский муниципальный район\n',723711),(20072,'Среднеахтубинский муниципальный район\n',514482),(20073,'Старополтавский муниципальный район\n',955623),(20074,'Суровикинский муниципальный район\n',551199),(20075,'Урюпинский муниципальный район\n',975429),(20076,'Фроловский муниципальный район',457201),(20077,'Чернышковский муниципальный район',689568);
/*!40000 ALTER TABLE `public_legal_entities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-06  2:51:43
