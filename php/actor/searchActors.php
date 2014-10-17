<?php

require("../db/db.php");
require("../extjs/extjsFunctions.php");

session_start();

$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];
$query = $_REQUEST['query'];

//select the information
$sql = "SELECT * FROM actor_info ";
$sql .= "WHERE first_name LIKE '%" . $query . "%' OR ";
$sql .= "last_name LIKE '%" . $query . "%' ";
$sql .= "LIMIT $start,  $limit";

$result = array();

if ($resultDb = $mysqli->query($sql)) {

    while($record = $resultDb->fetch_assoc()) {

        array_push($result, $record);
    }

    $resultDb->close();
}

//count total records from table for paging
$sql = "SELECT count(*) as num FROM actor_info ";
$sql .= "WHERE first_name LIKE '%" . $query . "%' OR ";
$sql .= "last_name LIKE '%" . $query . "%' ";
$total = 0;
if ($resultDb = $mysqli->query($sql)) {

    $record = $resultDb->fetch_assoc();
    $total = $record['num'];

    $resultDb->close();
}

//send back information to extjs
echo json_encode(array(
    "success" => $mysqli->connect_errno == 0,
    "total" => $total,
    "data" => $result
));

/* close connection */
$mysqli->close();