USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`groups`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(100) NOT NULL ,
  `userName` VARCHAR(25) NOT NULL ,
  `password` VARCHAR(65) NOT NULL ,
  `email` VARCHAR(100) NOT NULL ,
  `picture` VARCHAR(100) NULL ,
  `groups_id` INT NOT NULL ,
  PRIMARY KEY (`id`, `groups_id`) ,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) ,
  INDEX `fk_user_groups1_idx` (`groups_id` ASC) ,
  CONSTRAINT `fk_user_groups1`
  FOREIGN KEY (`groups_id` )
  REFERENCES `sakila`.`groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Inserte 1 group and user
-- -----------------------------------------------------
INSERT INTO `sakila`.`groups` (`name`) VALUES ('admin');

INSERT INTO `sakila`.`user` (`name`, `userName`, `password`, `email`, `groups_id`)
VALUES ('Loiane Groner', 'loiane', '$2a$10$2a4e8803c91cc5edca222evoNPfhdRyGEG9RZcg7.qGqTjuCgXKda', 'me@loiane.com', '1');