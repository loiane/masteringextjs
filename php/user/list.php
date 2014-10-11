<?php

require("../db/db.php");

session_start();
if(empty($_SESSION["username"])) {
    header("HTTP/1.0 403 Forbidden");
    exit;
}

$groupId = isset($_REQUEST['group']);

$sql = "SELECT id, name, userName, email, picture, groups_id FROM user";

if ($groupId) {
    $sql .= " WHERE group_id = '$groupId'";
}

$result = array();

if ($resultdb = $mysqli->query($sql)) {

    while($profile = $resultdb->fetch_assoc()) {


        $sqlQuery = "SELECT * FROM groups WHERE id = " . $profile['groups_id'];

        if ($resultDb1 = $mysqli->query($sqlQuery)) {
            while ($item = $resultDb1->fetch_assoc()) {
                $profile['group'] = $item;
            }
        }

        $result[] = $profile;
    }

    $resultdb->close();
}

echo json_encode(array(
    "success" => $mysqli->connect_errno == 0,
    "data" => $result
));

/* close connection */
$mysqli->close();

?>