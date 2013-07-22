<?php

// resume the session
session_start();

// Unset all of the session variables.
$_SESSION = array();

// Finally, destroy the session.
session_destroy();

// send result back to Ext JS
$result = array();

$result['success'] = true;
$result['msg'] = 'logout';

echo json_encode($result);

?>