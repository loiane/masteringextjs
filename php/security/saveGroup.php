<?php

require("../db/db.php");

session_start();

$id = $_POST['id']; 
$name = $_POST['name'];
$permissions = $_POST['permissions'];
$permissions = explode(',', $permissions);

if ($id ==  0) { //create

	$insertQuery = "INSERT INTO Groups (name) VALUES ('$name')";

	if ($resultdb = $mysqli->query($insertQuery)) {

		$id = $mysqli->insert_id;

		foreach ($permissions as $menu_id) {

			$insertQuery = "INSERT INTO Permissions (Menu_id, Group_id) ";
			$insertQuery .= "VALUES ('$menu_id', '$id')";

			$resultdb = $mysqli->query($insertQuery);
		}
		//$resultdb->close();	
	}	
} else {

	$updateQuery = "UPDATE Groups SET name='$name' WHERE id='$id'";

	if ($resultdb = $mysqli->query($updateQuery)) {

		$deleteQuery = "DELETE FROM Permissions WHERE Group_id='$id'";

		if ($resultdb = $mysqli->query($deleteQuery)) {

			foreach ($permissions as $menu_id) {

				$insertQuery = "INSERT INTO Permissions (Menu_id, Group_id) ";
				$insertQuery .= "VALUES ('$menu_id', '$id')";

				$resultdb = $mysqli->query($insertQuery);
			}
		}
//		$resultdb->close();		
	}	
}

echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"msg" => $mysqli->error
));

/* close connection */
$mysqli->close();

?>