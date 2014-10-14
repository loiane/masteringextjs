<?php

require("../db/db.php");

//validate if user can do this action
//sanitize input for security

session_start();

$data = $_POST['data'];

$data = json_decode(stripslashes($data));

foreach ($data as $value){

    $query = sprintf("INSERT INTO actor (first_name, last_name, last_update)  values ('%s', '%s', '%s')",
        $mysqli->real_escape_string($value->first_name),
        $mysqli->real_escape_string($value->last_name),
        $mysqli->real_escape_string($value->last_update));

    if ($resultDb = $mysqli->query($query)) {
        $id = $mysqli->insert_id;
        $value->actor_id = $id;
    }
}

echo json_encode(array(
    "success" => $mysqli->error == '',
    "data" => $data
));

/* close connection */
$mysqli->close();
