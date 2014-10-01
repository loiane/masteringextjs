<?php

require("../../db/db.php");

session_start();

$groupId = isset($_REQUEST['group']);

$sql = "SELECT * FROM user";

if ($groupId) {
    $sql .= " WHERE group_id = '$groupId'";
}

$result = array();

if ($resultdb = $mysqli->query($sql)) {

    while($profile = $resultdb->fetch_assoc()) {


        $sqlQuery = "SELECT * FROM groups WHERE id = " . $profile['groups_id'];

        if ($resultDb1 = $mysqli->query($sqlQuery)) {
            while ($item = $resultDb1->fetch_assoc()) {
                $profile['menu'] = $item;
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