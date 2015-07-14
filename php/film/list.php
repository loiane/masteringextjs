<?php

require("../db/db.php");
require("../extjs/extjsFunctions.php");

session_start();

$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];

//select the information
$sql = "SELECT * FROM film LIMIT $start,  $limit";

$categoriesQuery = "SELECT b.category_id, b.name, b.last_update FROM film_category a ";
$categoriesQuery .= "INNER JOIN category b on a.category_id = b.category_id ";
$categoriesQuery .= "WHERE film_id = %d";

$actorsQuery = "SELECT b.actor_id, b.first_name, b.last_name, b.last_update FROM film_actor a ";
$actorsQuery .= "INNER JOIN actor b on a.actor_id = b.actor_id ";
$actorsQuery .= "WHERE film_id = %d";

$result = array();
$film_categories = array();

if ($resultDb = $mysqli->query($sql)) {

    while($record = $resultDb->fetch_assoc()) {

        //retrieve categories (many-to-many)
        $fcQuery = sprintf($categoriesQuery, $record['film_id']);
        if ($resultDbFC = $mysqli->query($fcQuery)) {
            $record['categories'] = array();

            while($category = $resultDbFC->fetch_assoc()) {
                array_push($record['categories'], $category);
            }
        }

        //retrieve actors (many-to-many)
        $faQuery = sprintf($actorsQuery, $record['film_id']);
        if ($resultDbFA = $mysqli->query($faQuery)) {
            $record['actors'] = array();

            while($actor = $resultDbFA->fetch_assoc()) {
                array_push($record['actors'], $actor);
            }
        }

        array_push($result, $record);
    }

    $resultDb->close();
}

//count total records from table for paging
$sql = "SELECT count(*) as num FROM film";
$total = 0;
if ($resultDb = $mysqli->query($sql)) {

    $record = $resultDb->fetch_assoc();
    $total = $record['num'];

    $resultDb->close();
}

//send back information to extjs
echo json_encode(array(
    'success' => $mysqli->connect_errno == 0,
    'data' => $result,
    'total' => $total
));

/* close connection */
$mysqli->close();