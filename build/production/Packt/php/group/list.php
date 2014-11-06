<?php

require("../db/db.php");

session_start();

$sql = 'SELECT * FROM groups';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql .= ' WHERE id = ' . $id;
}

$result = array();

if ($resultDb = $mysqli->query($sql)) {

while($profile = $resultDb->fetch_assoc()) {
$result[] = $profile;
}

$resultDb->close();
}

echo json_encode(array(
"success" => $mysqli->connect_errno == 0,
"data" => $result
));

/* close connection */
$mysqli->close();