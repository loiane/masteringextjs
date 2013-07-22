<?php

//if (have_posts()){

	while ( have_posts() ) : the_post();
		echo '<h2>';
			the_title();
		echo '</h2>';
		the_content();
	endwhile;

//}

// $result = array();
// $film_categories = array();

// if ($resultdb = $mysqli->query($sql)) {

// 	while($record = $resultdb->fetch_assoc()) {

		

// 		array_push($result, $record);
// 	}	

// 	$resultdb->close();
// }


// //send back information to extjs
// echo json_encode(array(
// 	"success" => $mysqli->connect_errno == 0,
// 	"data" => $result,
// 	"total" => $total,
// 	"test" => 'test'
// ));	

?>