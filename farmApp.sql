/*
Farm App Database Beta
not populated
Keegan McLean
01-20-24
*/


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `farmapp` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `farmapp`;

CREATE TABLE IF NOT EXISTS `farm` (
  `farmID` int(11) NOT NULL,
  `UsersFarmsID` int(11) NOT NULL,
  `FarmName` varchar(50) NOT NULL,
  `FarmPassword` varchar(50) NOT NULL,
  PRIMARY KEY (`farmID`),
  KEY `FK_farm_usersfarms` (`UsersFarmsID`),
  CONSTRAINT `FK_farm_usersfarms` FOREIGN KEY (`UsersFarmsID`) REFERENCES `usersfarms` (`UserFarmID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `farm`;

CREATE TABLE IF NOT EXISTS `herds` (
  `herdID` int(11) NOT NULL,
  `FarmID` int(11) NOT NULL,
  `HeardName` varchar(50) DEFAULT NULL,
  `AnimalType` varchar(50) NOT NULL COMMENT 'restriction drop down menu or type of animal',
  `#ofHead` int(11) NOT NULL,
  `AVGWeight` int(11) NOT NULL COMMENT 'Calculated in program or entered',
  PRIMARY KEY (`herdID`),
  KEY `FK_herds_farm` (`FarmID`),
  CONSTRAINT `FK_herds_farm` FOREIGN KEY (`FarmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `herds`;

CREATE TABLE IF NOT EXISTS `paddocks` (
  `PaddockID` int(11) NOT NULL,
  `FarmID` int(11) DEFAULT NULL,
  `daysUsed` int(11) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `yeild` int(11) DEFAULT NULL,
  PRIMARY KEY (`PaddockID`),
  KEY `FK_paddocks_farms` (`FarmID`),
  CONSTRAINT `FK_paddocks_farms` FOREIGN KEY (`FarmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `paddocks`;

CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  `UsersFarmsID` int(11) NOT NULL,
  PRIMARY KEY (`UserID`),
  KEY `FK_users_usersfarms` (`UsersFarmsID`),
  CONSTRAINT `FK_users_usersfarms` FOREIGN KEY (`UsersFarmsID`) REFERENCES `usersfarms` (`UserFarmID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `users`;

CREATE TABLE IF NOT EXISTS `usersfarms` (
  `UserFarmID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FarmID` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserFarmID`),
  KEY `FK_usersfarms_users` (`UserID`),
  KEY `FK_usersfarms_farm` (`FarmID`),
  CONSTRAINT `FK_usersfarms_farm` FOREIGN KEY (`FarmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_usersfarms_users` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `usersfarms`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
