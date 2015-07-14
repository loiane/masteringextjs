<?php

function retrievePermissions($userName){

    require('../db/db.php');

    $sqlQuery = "SELECT p.menu_id menuId FROM user u ";
    $sqlQuery .= "INNER JOIN permissions p ON u.groups_id = p.groups_id ";
    $sqlQuery .= "INNER JOIN menu m ON p.menu_id = m.id ";
    $sqlQuery .= "WHERE u.username = '$userName' ";

    $permissions = [];

    if ($resultDb = $mysqli->query($sqlQuery)) {
        while($user = $resultDb->fetch_assoc()) {
            $permissions[] =  $user['menuId'];
        }
    }

    $mysqli->close();

    return $permissions;
}

function retrieveModules($permissions){

    require('../db/db.php');

    $inClause = '(' . join(',',$permissions) . ')';

    $sqlQuery = "SELECT id, text, iconCls FROM menu WHERE menu_id IS NULL AND id in $inClause";

    $modules = [];

    if ($resultDb = $mysqli->query($sqlQuery)) {
        while($module = $resultDb->fetch_assoc()) {
            $modules[] = $module;

        }
    }


    $mysqli->close();

    return $modules;
}

function retrieveMenuOptions($modules, $permissions){

    require('../db/db.php');

    $inClause = '(' . join(',',$permissions) . ')';

    $result = [];

    foreach ($modules as $module) {

        $sqlQuery = "SELECT * FROM menu WHERE menu_id = '";
        $sqlQuery .= $module['id'] ."' AND id in $inClause";

        // check if have a child node
        if ($resultDb = $mysqli->query($sqlQuery)) {

            // determine number of rows result set
            $count = $resultDb->num_rows;

            if ($count > 0){

                $module['items'] = array();

                while ($item = $resultDb->fetch_assoc()) {
                    $module['items'][] = $item;
                }

            }
            $result[] = $module;
        }
    }

    $mysqli->close();

    return $result;
}