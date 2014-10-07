<?php

require("../db/db.php");

session_start();

$data = $_POST['data'];

$data = json_decode(stripslashes($data));

//$id = $data->id;
$userName = $data[0]->userName;
$name = $data[0]->name;
$email = $data[0]->email;
$group = $data[0]->groups_id;
$password = "e10adc3949ba59abbe56e057f20f883e"; //123456 - default password
$uploads_dir = '../../../resources/profileImages';
$fileName = null;
$id = 0;

//if(isset($_FILES)){
//
//    $tmpName = $_FILES['picture']['tmp_name'];
//    $fileName = $_FILES['picture']['name'];
//
//    move_uploaded_file($tmpName, "$uploads_dir/$fileName");
//}

//if ($id ==  0) { //create

    $insertQuery = "INSERT INTO user (name, userName, email, picture, groups_id) ";
    $insertQuery .= "VALUES ('$name', '$userName', '$email', '$fileName', '$group')";

    if ($resultDb = $mysqli->query($insertQuery)) {
        $id = $mysqli->insert_id;
    }
//}

header('Content-type: text/json');

if ($id != 0){
    $data[0]->id = $id;
}

//$data[0]->groups_id = 1;
$data[0]->picture = '';

echo json_encode(array(
    "success" => $mysqli->error == '',
    //"msg" => $mysqli->error,
    "data" => $data
));

/* close connection */
$mysqli->close();
