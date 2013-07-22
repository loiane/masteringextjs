INSERT INTO `sakila`.`Menu` (`id`, `text`, `iconCls`) 
VALUES ('4', 'staticData', 'menu_staticdata');

INSERT INTO `sakila`.`Menu` (`text`, `iconCls`, `parent_id`, `className`) 
VALUES 
('actor', 'menu_actor', '4', 'actorsgrid'),
('category', 'menu_category', '4', 'categoriesgrid'),
('language', 'menu_language', '4', 'languagesgrid'),
('city', 'menu_city', '4', 'citiesgrid'),
('country', 'menu_country', '4', 'countriesgrid');

INSERT INTO `sakila`.`Permissions` (`Menu_id`, `Group_id`) 
VALUES 
('4', '1'),
('5', '1'),
('6', '1'),
('7', '1'),
('8', '1'),
('9', '1');
