<?php
	
require("../db/db.php");
require("../extjs/extjsFunctions.php");

session_start();

$film_id = $_REQUEST['filmId'];

//select the information
$sql = "SELECT c.actor_id, c.first_name, c.last_name, f.last_update FROM actor c ";
$sql .= "inner join film_actor f ON f.actor_id = c.actor_id ";
$sql .= "WHERE f.film_id = $film_id";

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