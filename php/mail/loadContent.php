<?php
	
require("../db/db.php");

session_start();

$id = $_REQUEST['id'];

//select the information
$sql = "SELECT content as content FROM Mail WHERE id = " . $id;
$content = '';
if ($resultdb = $mysqli->query($sql)) {

	$record = $resultdb->fetch_assoc();
	$content = $record['content'];

	$resultdb->close();
}

//send back information to extjs
echo $content;

/* close connection */
$mysqli->close();

?>