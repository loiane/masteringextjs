INSERT INTO `sakila`.`Menu` (`id`, `text`, `iconCls`) VALUES ('10', 'cms', 'menu_cms');
INSERT INTO `sakila`.`Menu` (`text`, `iconCls`, `parent_id`, `className`) VALUES ('films', 'menu_films', '10', 'filmsgrid');

INSERT INTO `sakila`.`Permissions` (`Menu_id`, `Group_id`) VALUES ('10', '1');
INSERT INTO `sakila`.`Permissions` (`Menu_id`, `Group_id`) VALUES ('11', '1');
