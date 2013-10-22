USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`Menu`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`Menu` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `text` VARCHAR(45) NOT NULL ,
  `iconCls` VARCHAR(15) NULL ,
  `parent_id` INT NULL ,
  `className` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Menu_Menu` (`parent_id` ASC) ,
  CONSTRAINT `fk_Menu_Menu`
    FOREIGN KEY (`parent_id` )
    REFERENCES `sakila`.`Menu` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Permissions`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`Permissions` (
  `Menu_id` INT NOT NULL ,
  `Group_id` INT NOT NULL ,
  PRIMARY KEY (`Menu_id`, `Group_id`) ,
  INDEX `fk_Menu_has_Group_Group1` (`Group_id` ASC) ,
  INDEX `fk_Menu_has_Group_Menu1` (`Menu_id` ASC) ,
  CONSTRAINT `fk_Menu_has_Group_Menu1`
    FOREIGN KEY (`Menu_id` )
    REFERENCES `sakila`.`Menu` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Menu_has_Group_Group1`
    FOREIGN KEY (`Group_id` )
    REFERENCES `sakila`.`Groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
