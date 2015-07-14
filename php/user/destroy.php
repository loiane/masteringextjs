<?php

require("../db/db.php");

session_start();

$data = $_POST['data'];

$data = json_decode(stripslashes($data));

$id = $data[0]->id;

$deleteQuery = "DELETE FROM user WHERE id='$id'";

$resultdb = $mysqli->query($deleteQuery);

echo json_encode(array(
    "success" => $mysqli->connect_errno == 0,
    "msg" => $mysqli->error
));

/* close connection */
$mysqli->close();