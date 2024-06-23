DELIMITER $$
CREATE TRIGGER trg_hidewallet
AFTER UPDATE ON `tbl_wallets` FOR EACH ROW
BEGIN
	UPDATE tbl_accounts SET `hide`= new.hide WHERE `id` = new.aid;
END;
$$
DELIMITER ;
