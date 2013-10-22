/*
-- Query: SELECT * FROM sakila.Menu
LIMIT 0, 1000

-- Date: 2013-10-22 20:53
*/
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (1,'menu1','menu_admin',NULL,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (2,'menu11','menu_groups',1,'groups');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (3,'menu12','menu_users',1,'users');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (4,'staticData','menu_staticdata',NULL,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (5,'actors','menu_actor',4,'actorsgrid');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (6,'categories','menu_category',4,'categoriesgrid');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (7,'languages','menu_language',4,'languagesgrid');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (8,'cities','menu_city',4,'citiesgrid');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (9,'countries','menu_country',4,'countriesgrid');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (10,'cms','menu_cms',NULL,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (11,'films','menu_films',10,'filmsgrid');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (12,'customer','menu_customer',10,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (13,'business','menu_business',10,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (14,'reports','menu_reports',NULL,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (15,'salesfilmcategory','menu_salesfilmc',14,'salesfilmcategory');
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (16,'mailclient','menu_mailclient',NULL,NULL);
INSERT INTO `Menu` (`id`,`text`,`iconCls`,`parent_id`,`className`) VALUES (17,'mail','menu_mail',16,'mailcontainer');
