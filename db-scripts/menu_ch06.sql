INSERT INTO `sakila`.`Menu` (`id`, `text`, `iconCls`) 
VALUES ('5', 'staticData', 'menu_staticdata');

INSERT INTO `sakila`.`Menu` (`text`, `iconCls`, `parent_id`, `className`) 
VALUES 
('actor', 'menu_actor', '5', 'actorsgrid'),
('category', 'menu_category', '5', 'categoriesgrid'),
('language', 'menu_language', '5', 'languagesgrid'),
('city', 'menu_city', '5', 'citiesgrid'),
('country', 'menu_country', '5', 'countriesgrid');

INSERT INTO `sakila`.`Permissions` (`Menu_id`, `Group_id`) 
VALUES 
('5', '1'),
('6', '1'),
('7', '1'),
('8', '1'),
('9', '1'),
('10', '1');
