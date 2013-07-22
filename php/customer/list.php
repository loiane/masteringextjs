<?php
	
require("../db/db.php");
require("../extjs/extjsFunctions.php");

session_start();

//select the information
$sql = "SELECT * FROM Customer";

$result = array();

if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		$sqlAddress = "SELECT * FROM Address where address_id = " . $record['address_id'];
		if ($resultdbAdd = $mysqli->query($sqlAddress)) {
			while($recordAdd = $resultdbAdd->fetch_assoc()) {
				$record['address'] = $recordAdd;
			}
		}	

		array_push($result, $record);
	}	

	$resultdb->close();
}

//send back information to extjs
echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"data" => $result
));	

/* close connection */
$mysqli->close();

?>