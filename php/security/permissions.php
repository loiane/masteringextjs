<?php

require("../db/db.php");

session_start();

$groupId = isset($_REQUEST['group']);

$folder = array();

$sql = "SELECT * FROM MENU WHERE parent_id IS NULL";

if ($resultdb = $mysqli->query($sql)) {

    while($r = $resultdb->fetch_assoc()) {

        $id = $r['id'];
        $queryString = "SELECT menu_id menuId FROM permissions ";
        $queryString .= "WHERE group_id = '$groupId' ";
        $queryString .= "and menu_id = '$id'";

        if ($checked = $mysqli->query($queryString)) {
            $r['checked'] = $checked->num_rows > 0;
        }  

        // check if have a child node
        if ($nodes = $mysqli->query("SELECT * FROM MENU WHERE parent_id = '". $r['id'] ."'")) {

            // determine number of rows result set
            $count = $nodes->num_rows;

            if ($count > 0){

                $r['expanded'] = true;

                $r['children'] = array();    

                while ($item = $nodes->fetch_assoc()) {

                    $id = $item['id'];
                    $queryString = "SELECT menu_id menuId FROM permissions ";
                    $queryString .= "WHERE group_id = '$groupId' ";
                    $queryString .= "and menu_id = '$id'";

                    if ($checked = $mysqli->query($queryString)) {

                        $item['checked'] = $checked->num_rows > 0;
                    }

                    $item['leaf'] = true;
                    $r['children'][] = $item;
                }
            } else {
                // if have no child
                $r['leaf'] = true;
            }
            $folder[] = $r;
        }   
    }
}
/* close connection */
    $mysqli->close();

echo json_encode($folder); 
?>