let personas = [];

function obtenerDatosLocalStorage() {
  let datos = localStorage.getItem("personas");
  if (datos) {
    personas = JSON.parse(datos);
    console.log("Datos obtenidos del Storage:", personas);
  } else {
    personas = []; 
    console.log("No hay datos en el Storage.");
  }
}

function guardarDatosLocalStorage() {
  localStorage.setItem("personas", JSON.stringify(personas));
  console.log("Datos guardados en el Local Storage.");
}

function agregarPersona() {
  let nombreInput = document.getElementById("nombreInput");
  let edadInput = document.getElementById("edadInput");

  let nombre = nombreInput.value.trim();
  let edad = parseInt(edadInput.value.trim(), 10);

  let mensaje = document.getElementById("mensaje");
  mensaje.textContent = "";

  if (nombre && !isNaN(edad)) {
    let nuevaPersona = { nombre: nombre, edad: edad };
    personas.push(nuevaPersona);
    console.log("Persona agregada:", nuevaPersona);

    nombreInput.value = "";
    edadInput.value = "";

    actualizarListaDOM();

    mensaje.textContent = "¡Persona agregada exitosamente!";
    habilitarTirarDado(); 

    Swal.fire(
      '¡Buen trabajo!',
      'Has agregado una nueva persona.',
      'success'
    );

  } else {
    mensaje.textContent = "Ingreso de datos inválido. No se agregó la persona.";
  }

  guardarDatosLocalStorage();
}

function actualizarListaDOM() {
  let lista = document.getElementById("lista-personas");
  lista.innerHTML = "";

  personas.forEach(function(persona) {
    let item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = "Nombre: " + persona.nombre + ", Edad: " + persona.edad;
    lista.appendChild(item);
  });
}


function habilitarTirarDado() {
  let botonTirar = document.getElementById("botonTirar");
  botonTirar.removeAttribute("disabled");
}

function TirarDado() {
  let dado = document.getElementById("Dado");
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  dado.textContent = randomNumber;

  let mensaje = document.getElementById("mensaje");
  mensaje.textContent = "";

  if (randomNumber === 6) {
    Swal.fire({
      title: 'Muy bien, has sacado "EL GRAN 6"',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
    })
  }
}

function cargarDatosDesdeJSON() {
  return new Promise((resolve, reject) => {
    fetch('datos.json')
      .then(response => response.json())
      .then(data => {
        console.log('Datos cargados:', data);
        resolve(data); // Resuelve la Promise con los datos cargados
      })
      .catch(error => {
        console.error('Error al cargar datos:', error);
        reject(error); // Rechaza la Promise en caso de error
      });
  });
}

// Agrega esta línea al final del evento de carga
window.addEventListener("load", function() {
  obtenerDatosLocalStorage();
  actualizarListaDOM();

  cargarDatosDesdeJSON() // Carga datos al cargar la página
    .then(data => {
      // Aquí puedes realizar acciones con los datos cargados, por ejemplo:
      // Agregarlos a personas, mostrar mensajes en el DOM, etc.
      console.log('Datos cargados exitosamente:', data);
    })
    .catch(error => {
      // Manejar el error si ocurre algún problema en la carga de datos
      console.error('Error al cargar datos:', error);
    });
});
