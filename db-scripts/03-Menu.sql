USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`menu`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`menu` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `text` VARCHAR(45) NOT NULL ,
  `iconCls` VARCHAR(30) NULL ,
  `className` VARCHAR(45) NULL ,
  `menu_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_menu_menu1_idx` (`menu_id` ASC) ,
  CONSTRAINT `fk_menu_menu1`
  FOREIGN KEY (`menu_id` )
  REFERENCES `sakila`.`menu` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`permissions`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sakila`.`permissions` (
  `menu_id` INT NOT NULL ,
  `groups_id` INT NOT NULL ,
  PRIMARY KEY (`menu_id`, `groups_id`) ,
  INDEX `fk_permissions_groups1_idx` (`groups_id` ASC) ,
  CONSTRAINT `fk_permissions_menu1`
  FOREIGN KEY (`menu_id` )
  REFERENCES `sakila`.`menu` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permissions_groups1`
  FOREIGN KEY (`groups_id` )
  REFERENCES `sakila`.`groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;
