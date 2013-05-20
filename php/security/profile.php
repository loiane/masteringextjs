<?php

// resume the session
session_start();

$userName = $_SESSION[username];

$action = isset($_POST['action']);

if ($action == 'load'){

	loadUserProfile($userName);

} else if ($action == 'save'){

	saveUserProfile();
}

function loadUserProfile($userName) {

	require("../db/db.php");

	$user = $mysqli->real_escape_string($userName);
	$sql = "SELECT id, name, userName, email, picture, group_id FROM USER WHERE userName='$user'";

	$result = array();

	if ($resultdb = $mysqli->query($sql)) {

		if ($resultdb->num_rows == 1){

			while($profile = $resultdb->fetch_assoc()) {
				$result = $profile;
			}	
		}	

		$resultdb->close();
	}
	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"data" => $result
	));

	$mysqli->close();	
}

function saveUserProfile($array, $userId) {
}	

?>