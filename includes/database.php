<?php

$db = mysqli_connect('localhost', 'root', 'root', 'barbershop', 3308);

var_dump($db);

if (!$db) {
	echo 'Error en la conexión';
	exit;
}

// echo 'Conexión correcta';