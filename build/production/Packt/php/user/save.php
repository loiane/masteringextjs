<?php

require("../db/db.php");

session_start();

//add session timeout handle
//add filter to verify is user can do this action

$id = $_POST['id'];
$userName = $_POST['userName'];
$name = $_POST['name'];
$email = $_POST['email'];
$group = $_POST['groups_id'];
$password = "$2a$10$2a4e8803c91cc5edca222evoNPfhdRyGEG9RZcg7.qGqTjuCgXKda"; //Packt@123 - default password
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

    $insertQuery = "INSERT INTO user (name, userName, password, email, picture, groups_id) ";
    $insertQuery .= "VALUES ('$name', '$userName', '$password', '$email', '$fileName', '$group')";

    if ($resultDb = $mysqli->query($insertQuery)) {
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
    $updateQuery .= "groups_id = '$group' ";
    $updateQuery .= " WHERE id='$id'";

    $resultDb = $mysqli->query($updateQuery);
}

header('Content-type: text/html');

echo json_encode(array(
    "success" => $mysqli->error == '',
    "msg" => $mysqli->error,
    "id" => $id
));

/* close connection */
$mysqli->close();