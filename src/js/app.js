//Variables globales
let pagina = 1;

document.addEventListener('DOMContentLoaded', function () {
	iniciarApp();

	// Resalta el Div actual según el tab al que se presiona.
	mostrarSeccion();

	// Oculta o muestra una sección según el tab al que se presiona.
	cambiarSeccion();

	//Paginación siguiente
	paginaSiguiente();

	//Paginación y anterior
	paginaAnterior();

	//paginación entre 1 al 3
	paginador();
});

const iniciarApp = () => mostrarServicios();

function mostrarSeccion() {

	//Eliminar mostrar-seccion de la sección anterior
	const seccionAnterior = document.querySelector('.mostrar-seccion');
	if (seccionAnterior) {
		seccionAnterior.classList.remove('mostrar-seccion');
	}

	const seccionActual = document.querySelector(`#paso-${pagina}`);
	seccionActual.classList.add('mostrar-seccion');

	//Eliminar la clase de actual en el tab anterior
	const tabAnterior = document.querySelector('.tabs .actual');
	if (tabAnterior) {
		tabAnterior.classList.remove('actual');
	}

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

			mostrarSeccion();

			paginador();
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
			precioServicio.textContent = `$ ${precio} USD`;
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

			// console.log(divServicio);
		});
	} catch (error) {
		console.log(error);
	}
}

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

function paginaSiguiente() {
	const paginaSiguiente = document.querySelector('#siguiente');
	paginaSiguiente.addEventListener('click', () => {
		pagina++;

		console.log(pagina);

		paginador();
	});
}

function paginaAnterior() {
	const paginaAnterior = document.querySelector('#anterior');
	paginaAnterior.addEventListener('click', () => {
		pagina--;

		console.log(pagina);

		paginador();
	});
}

function paginador() {
	const paginaSiguiente = document.querySelector('#siguiente');
	const paginaAnterior = document.querySelector('#anterior');

	if (pagina === 1) {
		paginaAnterior.classList.add('ocultar');
	} else if (pagina === 3) {
		paginaSiguiente.classList.add('ocultar');
		paginaAnterior.classList.remove('ocultar');
	} else {
		paginaAnterior.classList.remove('ocultar');
		paginaSiguiente.classList.remove('ocultar');
	}

	mostrarSeccion();
}
