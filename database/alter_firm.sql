ALTER TABLE `rfdb2`.`tblFirm` 
ADD COLUMN `website` VARCHAR(50) NULL AFTER `gid`,
CHANGE COLUMN `hide` `hide` TINYINT NULL DEFAULT '0' AFTER `id`,
CHANGE COLUMN `sumtype` `rad_history` TINYINT NULL DEFAULT '-1' AFTER `website`,
CHANGE COLUMN `firmname` `business` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `id_grp` `gid` INT NULL DEFAULT NULL ,
CHANGE COLUMN `description` `desc_history` VARCHAR(100) NULL DEFAULT NULL , RENAME TO  `rfdb2`.`tbl_businesses` ;

