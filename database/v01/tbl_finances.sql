CREATE TABLE `tbl_finances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `aid` int DEFAULT NULL,
  `income` decimal(11,2) DEFAULT NULL,
  `fixed` decimal(11,2) DEFAULT NULL,
  `other` decimal(11,2) DEFAULT NULL,
  `bid` int DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date` (`date`),
  KEY `bid` (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SELECT * FROM rfdb2.tbl_config;