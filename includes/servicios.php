<?php
require 'db/funciones.php';

$servicios = obtenerServicios();

echo json_encode($servicios);
