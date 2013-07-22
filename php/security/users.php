<?php
	
require("../db/db.php");

session_start();

$groupId = isset($_REQUEST['group']);

$sql = "SELECT * FROM User";

if ($groupId) {
	$sql .= " WHERE group_id = '$groupId'";
}

$result = array();

if ($resultdb = $mysqli->query($sql)) {

	while($profile = $resultdb->fetch_assoc()) {
		$result[] = $profile;
	}	

	$resultdb->close();
}

echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"data" => $result
));	

/* close connection */
$mysqli->close();

?>