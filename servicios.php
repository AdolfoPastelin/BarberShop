<?php
require 'includes/funciones.php';

// Almacena en la variable servicios
// el arreglo multiple de funciones.php
$servicios = obtenerServicios();

// Lo convierte en un string
echo json_encode($servicios);
