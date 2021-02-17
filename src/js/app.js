//Variables globales
let pagina = 1;

document.addEventListener('DOMContentLoaded', function () {
	iniciarApp();

	// Resalta el Div actual según el tab al que se presiona.
	mostrarSeccion();

	// Oculta o muestra una sección según el tab al que se presiona.
	cambiarSeccion();
});

const iniciarApp = () => mostrarServicios();

function mostrarSeccion() {
	const seccionActual = document.querySelector(`#paso-${pagina}`);
	seccionActual.classList.add('mostrar-seccion');

	// Resaltar el tab actual
	const tab = document.querySelector(`[data-paso="${pagina}"]`); //? Obtiene el id del boton actual
	tab.classList.add('actual');
}

function cambiarSeccion() {
	const enlaces = document.querySelectorAll('.tabs button');

	enlaces.forEach((enlace) => {
		enlace.addEventListener('click', (e) => {
			e.preventDefault();
			pagina = parseInt(e.target.dataset.paso);

			//Eliminar mostrar-seccion de la sección anterior
			document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

			//Agrega mostrar-seccion donde dimos click
			const seccion = document.querySelector(`#paso-${pagina}`);
			seccion.classList.add('mostrar-seccion');

			//Eliminar la clase de actual en el tab anterior
			document.querySelector('.tabs .actual').classList.remove('actual');

			//Agregar la clase actual en el nuevo tab
			const tab = document.querySelector(`[data-paso="${pagina}"]`);
			tab.classList.add('actual');
		});
	});
}

async function mostrarServicios() {
	try {
		const resultado = await fetch('./servicios.json');
		const db = await resultado.json();
		const { servicios } = db;

		//* Generar el HTML
		servicios.forEach((servicio) => {
			const { id, nombre, precio } = servicio;

			//* DOM Scripting
			//Generar nombre del servicio
			const nombreServicio = document.createElement('P');
			nombreServicio.textContent = nombre;
			nombreServicio.classList.add('nombre-servicio');

			//Generar precio del servicio
			const precioServicio = document.createElement('P');
			precioServicio.textContent = `$ ${precio}`;
			precioServicio.classList.add('precio-servicio');

			//Generar el contenedor para el servicio
			const divServicio = document.createElement('DIV');
			divServicio.classList.add('servicio');
			divServicio.dataset.idServicio = id; //? Agrega un atributo personalizado para el id

			//Selecciona un servicio para la cita
			divServicio.onclick = seleccionarServicio;

			//Inyectar precio y nombre al div de servicio
			divServicio.appendChild(nombreServicio);
			divServicio.appendChild(precioServicio);

			//Inyectarlo en el HTML
			document.querySelector('#servicios').appendChild(divServicio);

			console.log(divServicio);
		});
	} catch (error) {
		console.log(error);
	}
}

//#TODO: Hacer notas en Notion acerca de esta función.

function seleccionarServicio(e) {
	//Forzar que el elemento al cual le damos click sea el DIV
	let elemento;

	if (e.target.tagName === 'P') {
		//captura el evento en el elemento en el que se haga click
		elemento = e.target.parentElement;
	} else {
		//captura el evento en el elemento en el que se haga click
		elemento = e.target;
	}

	//comprueba si existe un elemento que contenga la clase .seleccionado
	if (elemento.classList.contains('seleccionado')) {
		elemento.classList.remove('seleccionado');
	} else {
		elemento.classList.add('seleccionado');
	}
}
