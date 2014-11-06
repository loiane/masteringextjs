<?php
require('PassHash.php');

$pass_hash = PassHash::hash('mypassworddddwerewfew');
echo $pass_hash;