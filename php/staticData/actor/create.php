<?php
	
// require("../../db/db.php");

// $data = $_POST['data'];

// //$data = json_decode(stripslashes($info));

// $result = array();

// foreach ($data as $record) {

// 	$last_update = $record->last_update;
// 	$actor_id = $record->actor_id;
// 	$first_name = $record->first_name;
// 	$last_name = $record->last_name;

// 	$query = "INSERT INTO Actor (first_name, last_name, last_update) ";
// 	$query .= "values ('%s', '%s', %d)";
// 	$query = sprintf($query,
// 	mysql_real_escape_string($first_name),
// 	mysql_real_escape_string($last_name),
// 	mysql_real_escape_string($last_update));

// 	if ($resultdb = $mysqli->query($query)) {
// 		$id = $mysqli->insert_id;
// 		array_push($result, array(
// 			"actor_id" => mysql_insert_id(),
// 			"last_update" => $nome,
// 			"first_name" => $email,
// 			"last_name" => $phone
// 		));
// 	}
// }	

echo json_encode(array(
	"success" => true,//mysql_errno() == 0,
	"data" => json_encode('[{"last_update":"2013-02-3 11:57:36","first_name":"First Name*","last_name":"Last Name*", "actor_id": "300"}]')
));
?>