<?php
	
require("../db/db.php");

$info = $_POST['data'];

$data = json_decode(stripslashes($info));

$result = array();

foreach ($data as $record) {

	$folder = $record->folder;
	$id = $record->id;

	// $query = "UPDATE Mail SET folder = '%s' WHERE id = %d";
	// $query .= "values ('%s', '%s', %d)";
	// $query = sprintf($query,
	// mysql_real_escape_string($folder),
	// mysql_real_escape_string($id));

	// if ($resultdb = $mysqli->query($query)) {

	// }
}	

echo json_encode(array(
	"success" => true,//mysql_errno() == 0,
	"data" => $data
));
?>