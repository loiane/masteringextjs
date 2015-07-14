<?php

require("../db/db.php");

session_start();

$sql = "SELECT * FROM category";

$result = array();

if ($resultDb = $mysqli->query($sql)) {

    while($record = $resultDb->fetch_assoc()) {
        array_push($result, $record);
    }

    $resultDb->close();
}

//send back information to ExtJS
echo json_encode(array(
    "success" => $mysqli->connect_errno == 0,
    "data" => $result
));

/* close connection */
$mysqli->close();
