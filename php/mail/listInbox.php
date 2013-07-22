<?php
	
require("../db/db.php");

session_start();

$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];

//select the information
$sql = "SELECT id, importance, attachement, `from`, subject, received, flag, folder, icon FROM Mail";

$result = array();
$film_categories = array();

if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		array_push($result, $record);
	}	

	$resultdb->close();
}

//count total records from table for paging
$sql = "SELECT count(*) as num FROM Mail";
$total = 0;
if ($resultdb = $mysqli->query($sql)) {

	$record = $resultdb->fetch_assoc();
	$total = $record['num'];

	$resultdb->close();
}

//send back information to extjs
echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"data" => $result,
	"total" => $total
));	

/* close connection */
$mysqli->close();

?>