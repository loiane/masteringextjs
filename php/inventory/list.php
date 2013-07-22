<?php
	
require("../db/db.php");
require("../extjs/extjsFunctions.php");

session_start();

$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];

//select the information
$sql = "SELECT * FROM Film LIMIT $start,  $limit";

$result = array();
$film_categories = array();

if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		// $sqlAddress = "SELECT * FROM Film_Category where film_id = " . $record['film_id'];
		// if ($resultdbAdd = $mysqli->query($sqlAddress)) {
		// 	while($recordAdd = $resultdbAdd->fetch_assoc()) {
		// 		array_push($film_categories, $recordAdd);
		// 	}
		// }

		// $record['filmCategories'] = $film_categories;	

		array_push($result, $record);
	}	

	$resultdb->close();
}

//count total records from table for paging
$sql = "SELECT count(*) as num FROM Film";
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
	"total" => $total,
	"test" => 'test'
));	

/* close connection */
$mysqli->close();

?>