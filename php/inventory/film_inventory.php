<?php
	
require("../db/db.php");

session_start();

$film_id = $_REQUEST['filmId'];

//select the information
$sql = "SELECT count(*) as num, a.address as store FROM inventory i ";
$sql .= "inner join store s on s.store_id = i.store_id ";
$sql .= "inner join address a on s.address_id = a.address_id ";
$sql .= "WHERE i.film_id  = $film_id ";
$sql .= "group by i.store_id";

$result = array();
$film_categories = array();

if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

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