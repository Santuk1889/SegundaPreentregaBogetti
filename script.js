let jugadores = [];

// url a img de escudos
const escudosEquipos = {
    "Boca Juniors": "images/boca.png",
    "River Plate": "images/river.png",
    "Independiente": "images/independiente.png",
    "Racing Club": "images/racing.png",
    "San Lorenzo": "images/sanlorenzo.png",
    "Rosario Central": "images/rosario.png",
    "Tiro Federal": "images/tirofederal.png",
    "Vélez Sarsfield": "images/velez.png",
    "Estudiantes": "images/estudiantes.png",
    "Gimnasia": "images/gimnasia.png"
};

// Función para agregar un jugador
function agregarJugador() {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const equipo = document.getElementById('equipo').value;
    const posicion = document.getElementById('posicion').value;
    const avatarInput = document.getElementById('avatar');
    const avatar = avatarInput.files[0] ? URL.createObjectURL(avatarInput.files[0]) : 'images/avatar.png'; // Avatar predeterminado

    if (nombre && !isNaN(edad) && equipo && posicion) {
        const jugador = { nombre, edad, equipo, posicion, avatar };
        jugadores.push(jugador);
        mostrarJugadores();
        limpiarFormulario();
    }
}

// Función para mostrar jugadores
function mostrarJugadores(filtroEquipo = '', filtroPosicion = '') {
    const lista = document.getElementById('listaJugadores');
    lista.innerHTML = '';

    let jugadoresFiltrados = jugadores;
    if (filtroEquipo) {
        jugadoresFiltrados = jugadoresFiltrados.filter(jugador => jugador.equipo === filtroEquipo);
    }
    if (filtroPosicion) {
        jugadoresFiltrados = jugadoresFiltrados.filter(jugador => jugador.posicion === filtroPosicion);
    }

    jugadoresFiltrados.forEach((jugador, index) => {
        const div = document.createElement('div');
        div.classList.add('jugador');
        div.innerHTML = `
            <img src="${jugador.avatar}" alt="Avatar" class="avatar">
            <div class="jugador-info">
                <strong>${jugador.nombre}</strong>
                <span><img src="${escudosEquipos[jugador.equipo]}" alt="Escudo" class="escudo"></span>
                <span>${jugador.equipo}</span>
                <span>Edad: ${jugador.edad}</span>
                <span>Posición: ${jugador.posicion}</span>
            </div>
            <button class="boton" onclick="editarJugador(${index})">Editar</button>
            <button class="boton" onclick="eliminarJugador(${index})">Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

// Función para eliminar un jugador
function eliminarJugador(index) {
    jugadores.splice(index, 1);
    mostrarJugadores();
}

// Función para editar un jugador
function editarJugador(index) {
    const jugador = jugadores[index];
    document.getElementById('nombre').value = jugador.nombre;
    document.getElementById('edad').value = jugador.edad;
    document.getElementById('equipo').value = jugador.equipo;
    document.getElementById('posicion').value = jugador.posicion;
    document.getElementById('avatar').value = '';

    eliminarJugador(index);
}

// Función para limpiar el formulario después de agregar un jugador
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('equipo').selectedIndex = 0;
    document.getElementById('posicion').selectedIndex = 0;
    document.getElementById('avatar').value = '';
}

// Función para aplicar filtros
function aplicarFiltros() {
    const filtroEquipo = document.getElementById('filtroEquipo').value;
    const filtroPosicion = document.getElementById('filtroPosicion').value;
    mostrarJugadores(filtroEquipo, filtroPosicion);
}

// Funciones para manejar local storage
function guardarJugadores() {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    alert('Jugadores guardados en el almacenamiento local.');
}

function recuperarJugadores() {
    const jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
        jugadores = JSON.parse(jugadoresGuardados);
        mostrarJugadores();
    } else {
        alert('No hay jugadores guardados.');
    }
}

function borrarJugadores() {
    localStorage.removeItem('jugadores');
    jugadores = [];
    mostrarJugadores();
}

function vaciarJugadores() {
    jugadores = [];
    mostrarJugadores();
}

// Eventos para botones
document.getElementById('agregarJugador').addEventListener('click', agregarJugador);
document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
document.getElementById('guardar').addEventListener('click', guardarJugadores);
document.getElementById('recuperar').addEventListener('click', recuperarJugadores);
document.getElementById('borrar').addEventListener('click', borrarJugadores);
document.getElementById('vaciar').addEventListener('click', vaciarJugadores);
