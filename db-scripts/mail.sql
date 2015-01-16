CREATE  TABLE IF NOT EXISTS `sakila`.`Mail` (
  `id` INT(11) NOT NULL ,
  `importance` TINYINT(1) NULL DEFAULT NULL ,
  `attachement` TINYINT(1) NULL DEFAULT NULL ,
  `from` VARCHAR(200) NOT NULL ,
  `subject` VARCHAR(200) NOT NULL ,
  `received` DATETIME NOT NULL ,
  `flag` VARCHAR(10) NULL DEFAULT NULL ,
  `folder` VARCHAR(45) NOT NULL ,
  `content` LONGBLOB NOT NULL ,
  `icon` VARCHAR(10) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;



INSERT INTO `Mail` (`id`,`importance`,`attachement`,`from`,`subject`,`received`,`flag`,`folder`,`content`,`icon`) VALUES (1,NULL,NULL,'Packt Publishing <contactus@packtpub.com>','[Packt Newsletter] Great Offers, Exciting New Releases, Interesting Articles and more','2013-02-27 13:16:00','1','inbox',?,'unread');
INSERT INTO `Mail` (`id`,`importance`,`attachement`,`from`,`subject`,`received`,`flag`,`folder`,`content`,`icon`) VALUES (2,1,NULL,'Packt Publishing <contactus@packtpub.com>','[PacktLib Newsletter] Home to over 1000 books','2013-02-27 00:32:00',NULL,'inbox',?,'read');
INSERT INTO `Mail` (`id`,`importance`,`attachement`,`from`,`subject`,`received`,`flag`,`folder`,`content`,`icon`) VALUES (3,NULL,1,'Packt Publishing <contactus@packtpub.com>','Great Offer on PrimeFaces Cookbook - Less than 24 Hours Left!','2013-02-26 12:33:00',NULL,'inbox',?,'reply');
INSERT INTO `Mail` (`id`,`importance`,`attachement`,`from`,`subject`,`received`,`flag`,`folder`,`content`,`icon`) VALUES (4,NULL,NULL,'Packt Publishing <contactus@packtpub.com>','[Packt Newsletter] Special Discounts, New Releases, Exciting News and more','2013-02-18 14:21:00',NULL,'inbox',?,'fwd');
