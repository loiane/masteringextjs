USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`Group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`Groups` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(100) NOT NULL ,
  `userName` VARCHAR(20) NOT NULL ,
  `password` VARCHAR(100) NOT NULL ,
  `email` VARCHAR(100) NOT NULL ,
  `picture` VARCHAR(100) NULL ,
  `Group_id` INT NOT NULL ,
  PRIMARY KEY (`id`, `Group_id`) ,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) ,
  INDEX `fk_User_Group1_idx` (`Group_id` ASC) ,
  CONSTRAINT `fk_User_Group1`
    FOREIGN KEY (`Group_id` )
    REFERENCES `sakila`.`Groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Inserte 1 group and user
-- -----------------------------------------------------
INSERT INTO `sakila`.`Groups` (`name`) VALUES ('admin');

INSERT INTO `sakila`.`User` (`name`, `userName`, `password`, `email`, `Group_id`) 
VALUES ('Loiane Groner', 'loiane', 'e10adc3949ba59abbe56e057f20f883e', 'me@loiane.com', '1');
