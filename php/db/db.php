<?php 
//$server = "192.168.0.11";
$server = "127.0.0.1";
$user = "root";
$pass = "";
$dbName = "sakila";

$mysqli = new mysqli($server, $user, $pass, $dbName);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}