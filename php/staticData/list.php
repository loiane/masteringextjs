<?php
	
require("../db/db.php");
require("../extjs/extjsFunctions.php");

session_start();

// collect parameters
$entity = $_POST['entity'];
//$start = $_POST['start'];
//$limit = $_POST['limit'];
//$sort = isset($_POST['sort']) ? $_POST['sort'] : null;
//$filters = isset($_POST['filter']) ? $_POST['filter'] : null;

//select the information
$sql = "SELECT * FROM " . $entity;

//add sorters and filters
//$sql .= " WHERE " . getExtJSFilters($filters);
//$sql .= getExtJSOrderBy($sort);

//apply paging
//$sql .= " LIMIT $start,  $limit";

$result = array();

if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {
		array_push($result, $record);
	}	

	$resultdb->close();
}

//count total records from table for paging
// $sql = "SELECT count(*) as num FROM " . $entity;
// $total = 0;
// if ($resultdb = $mysqli->query($sql)) {

// 	$record = $resultdb->fetch_assoc();
// 	$total = $record['num'];

// 	$resultdb->close();
// }

//send back information to extjs
echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	//"total" => $total,
	"data" => $result
));	

/* close connection */
$mysqli->close();

?>