<?php

require("../db/db.php");

session_start();

$id = $_POST['id']; 

$deleteQuery = "DELETE FROM Permissions WHERE Group_id='$id'";

if ($resultdb = $mysqli->query($deleteQuery)) {

	$deleteQuery = "DELETE FROM Groups WHERE id='$id'";

	$resultdb = $mysqli->query($deleteQuery);
}	

echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"msg" => $mysqli->error
));

/* close connection */
$mysqli->close();

?>