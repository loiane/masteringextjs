INSERT INTO `sakila`.`Menu` (`id`, `text`, `iconCls`) VALUES ('11', 'cms', 'menu_cms');
INSERT INTO `sakila`.`Menu` (`text`, `iconCls`, `parent_id`, `className`) VALUES ('films', 'menu_films', '11', 'filmsgrid');

INSERT INTO `sakila`.`Permissions` (`Menu_id`, `Group_id`) VALUES ('11', '1');
INSERT INTO `sakila`.`Permissions` (`Menu_id`, `Group_id`) VALUES ('12', '1');


-- -----------------------------------------------------
-- Chapter 08
-- -----------------------------------------------------



