<?php

$db = mysqli_connect('localhost', 'root', 'root', 'barbershop', 3308);

if (!$db) {
	echo 'Error en la conexión';
	exit;
}

// echo 'Conexión correcta';