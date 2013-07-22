<?php

require("db/db.php");

session_start();

$username = $_SESSION['username'];

$queryString = "SELECT p.menu_id menuId FROM User u ";
$queryString .= "INNER JOIN permissions p ON u.group_id = p.group_id ";
$queryString .= "INNER JOIN menu m ON p.menu_id = m.id ";
$queryString .= "WHERE u.username = '$username' ";

$folder = array();

if ($resultdb = $mysqli->query($queryString)) {

	$in = '(';

	/* fetch associative array */	
	while($user = $resultdb->fetch_assoc()) {
	    $in .=  $user['menuId'] . ",";
	}

	$in = substr($in, 0, -1) . ")";
	
	/* free result set */
    $resultdb->free();	

	$sql = "SELECT * FROM MENU WHERE parent_id IS NULL AND id in $in";

	if ($resultdb = $mysqli->query($sql)) {

		while($r = $resultdb->fetch_assoc()) {

	    	$sqlquery = "SELECT * FROM MENU WHERE parent_id = '";
	    	$sqlquery .= $r['id'] ."' AND id in $in";

	    	// check if have a child node
	    	if ($nodes = $mysqli->query($sqlquery)) {
	    	
	    		// determine number of rows result set
				$count = $nodes->num_rows;

				if ($count > 0){

					// if have a child
					$r['leaf'] = false;

					$r['items'] = array();

					while ($item = $nodes->fetch_assoc()) {
						$item['leaf'] = true;
						$r['items'][] = $item;
					}

				} else {
					// if have no child
					$r['leaf'] = true;
				}
				$folder[] = $r;
	    	}	

		}
	}
	/* close result set */
	$resultdb->close();
}

/* close connection */
$mysqli->close();

echo json_encode(array(
	"items" => $folder
));	
?>