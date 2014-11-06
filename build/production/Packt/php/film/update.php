<?php

require("../db/db.php");

//validate if user can do this action
//sanitize input for security

session_start();

$data = $_POST['data'];

$data = json_decode(stripslashes($data));


echo json_encode(array(
    "success" => $mysqli->error == '',
    "data" => $data
));

/* close connection */
$mysqli->close();
