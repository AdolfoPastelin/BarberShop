//Variables globales
let pagina = 1;

const cita = {
	nombre: '',
	fecha: '',
	hora: '',
	servicios: [],
};

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

	//Muestra el resumen de la cita (o mensaje de error en caso de no pasar la validación)
	mostrarResumen();

	//Almacena el nombre de la cita en el objeto
	nombreCita();
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

		const id = parseInt(elemento.dataset.idServicio);

		eliminarServicio(id);
	} else {
		elemento.classList.add('seleccionado');

		const servicioObj = {
			id: parseInt(elemento.dataset.idServicio),
			nombre: elemento.firstElementChild.textContent,
			precio: elemento.firstElementChild.nextElementSibling.textContent,
		};

		agregarServicio(servicioObj);
		// console.log(servicioObj);
	}
}

function eliminarServicio(id) {
	const { servicios } = cita;
	cita.servicios = servicios.filter((servicio) => servicio.id !== id);

	console.log(cita);
}

function agregarServicio(servicioObj) {
	const { servicios } = cita;
	cita.servicios = [...servicios, servicioObj];

	console.log(cita);
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

function mostrarResumen() {
	//Destructuring
	const { nombre, fecha, hora, servicios } = cita;

	//Seleccionar el resumen
	const divResumen = document.querySelector('.contenido-resumen');

	//Validacion de objeto
	if (Object.values(cita).includes('')) {
		const noServicios = document.createElement('P');
		noServicios.textContent = 'Data from name, date or time is missing';
		noServicios.classList.add('invalidar-cita');

		//Agregar a divResumen
		divResumen.appendChild(noServicios);
	}
}

function nombreCita() {
	const nombreInput = document.querySelector('#nombre');

	nombreInput.addEventListener('input', (e) => {
		const nombreTexto = e.target.value.trim();

		//Validacion nombre texto vacio
		if (nombreTexto === '' || nombreTexto.length < 2) {
			mostrarAlerta('Invalid name', 'error');
		} else {
			const alerta = document.querySelector('.alerta');
			if (alerta) {
				alerta.remove();
			}
		}
		cita.nombre = nombreTexto;
	});
}

function mostrarAlerta(mensaje, tipo) {

	//Si hay una alerta previa, entonces no crear otra
	const alertaPrevia = document.querySelector('.alerta');
	if (alertaPrevia) {
		return;
	}

	const alerta = document.createElement('DIV');
	alerta.textContent = mensaje;
	alerta.classList.add('alerta');

	if (tipo === 'error') {
		alerta.classList.add('error');
	}

	console.log(alerta);

	// Insertar en el HTML
	const formulario = document.querySelector('.formulario');
	formulario.appendChild(alerta);

	//Eliminar la alerta despues de 3 segundos
	setTimeout(() => {
		alerta.remove();
	}, 4000);
}