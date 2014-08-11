<?php

require("../db/db.php");
require("PassHash.php");

session_start();

// username and password sent from form 
$userName = $_POST['user'];
$pass = $_POST['password']; 

// To protect MySQL injection (more detail about MySQL injection)
$userName = stripslashes($userName);
$pass = stripslashes($pass);

$userName = $mysqli->real_escape_string($userName);
$pass = $mysqli->real_escape_string($pass);
$sql = "SELECT * FROM USER WHERE userName='$userName'";

$result = array();

if ($resultDb = $mysqli->query($sql)) {

	// determine number of rows result set
	$count = $resultDb->num_rows;

	// If result matched $userName and $pass, table row must be 1 row
	if($count==1){

        $record = $resultDb->fetch_assoc();

        if (PassHash::check_password($record['password'],$pass)){
            $_SESSION['authenticated'] = "yes";
            $_SESSION['username'] = $userName;

            $result['success'] = true;
            $result['msg'] = 'User authenticated!';

        } else{
            $result['success'] = false;
            $result['msg'] = 'Incorrect password.';
        }

	} else {
		
		$result['success'] = false;
		$result['msg'] = 'Incorrect user or password.';
	}

	/* close result set */
	$resultDb->close();
}

/* close connection */
$mysqli->close();

//JSON encoding
echo json_encode($result);
?>
