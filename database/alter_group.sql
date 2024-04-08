ALTER TABLE `rfdb2`.`tblGroup` 
ADD COLUMN `description` VARCHAR(50) NULL AFTER `group`,
CHANGE COLUMN `hide` `hide` TINYINT NULL DEFAULT '0' AFTER `id`,
CHANGE COLUMN `groupname` `group` VARCHAR(50) NOT NULL , RENAME TO  `rfdb2`.`tbl_groups` ;
