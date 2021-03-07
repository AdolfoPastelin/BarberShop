<?php
function obtenerServicios(): array
{
	try {

		//importar una conexión
		require 'database.php';

		//Escribir el código SQL
		$sql = "SELECT * FROM servicios;";
		$consulta = mysqli_query($db, $sql);

		//arreglo indexado contenedor de servicios (como arreglos asociativos)
		$servicios = [];
		$i = 0; //iterador para ir aumentando del indice de index de arreglo servicios

		//obtener resultados
		//? fetch_assoc (arreglo asociativo) solo trae el último registro
		//? se usa un while para poder recorrer el fetch_assoc
		while ($row = mysqli_fetch_assoc($consulta)) {

			$servicios[$i]['id'] = $row['id'];
			$servicios[$i]['nombre'] = $row['nombre'];
			$servicios[$i]['precio'] = $row['precio'];

			$i++;
		}

		return $servicios;
	} catch (\Throwable $th) {
		throw $th;
	}
}
obtenerServicios();
