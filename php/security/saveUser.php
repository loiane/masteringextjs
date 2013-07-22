<?php

require("../db/db.php");

session_start();

$id = $_POST['id']; 
$userName = $_POST['userName'];
$name = $_POST['name'];
$email = $_POST['email'];
$group = $_POST['Group_id'];
$password = "e10adc3949ba59abbe56e057f20f883e"; //123456 - default password
$uploads_dir = '../../resources/profileImages';

if ($id == ""){
	$id = 0;
}

if(isset($_FILES)){

	$tmpName = $_FILES['picture']['tmp_name'];
	$fileName = $_FILES['picture']['name'];

	move_uploaded_file($tmpName, "$uploads_dir/$fileName");
}	

if ($id ==  0) { //create

	$insertQuery = "INSERT INTO user (name, userName, password, email, picture, Group_id) ";
	$insertQuery .= "VALUES ('$name', '$userName', '$password', '$email', '$fileName', '$group')";

	if ($resultdb = $mysqli->query($insertQuery)) {
		$id = $mysqli->insert_id;
	}	
} else {

	$updateQuery = "UPDATE user SET ";
	$updateQuery .= "name = '$name', ";
	$updateQuery .= "userName = '$userName', ";
	$updateQuery .= "email = '$email', ";
	if ($fileName != null) { // only update it if file upload
		$updateQuery .= "picture = '$fileName', ";
	}
	$updateQuery .= "Group_id = '$group' ";
	$updateQuery .= " WHERE id='$id'";

	$resultdb = $mysqli->query($updateQuery);	
}

header('Content-type: text/html');

echo json_encode(array(
	"success" => $mysqli->error == '',
	"msg" => $mysqli->error,
	"id" => $id
));

/* close connection */
$mysqli->close();
?>