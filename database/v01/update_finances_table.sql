UPDATE `rfdb2`.`tbl_finances` SET `aid` = '1' WHERE (`id` > '0');
UPDATE `rfdb2`.`tbl_finances` SET `income` = null WHERE (`id` > '0' AND `income` = '0.00');
UPDATE `rfdb2`.`tbl_finances` SET `fixed` = null WHERE (`id` > '0' AND `fixed` = '0.00');
UPDATE `rfdb2`.`tbl_finances` SET `other` = null WHERE (`id` > '0' AND `other` = '0.00');