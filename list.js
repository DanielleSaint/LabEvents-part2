const botonAgregar = document.getElementById('botonTarea');

//Cargar tareas
document.addEventListener('DOMContentLoaded', function () {
    let tareasGuardadas = JSON.parse(localStorage.getItem("ToDo")) || [];
    tareasGuardadas.forEach( function (tarea) {
        mostrarTareas(tarea.titulo, tarea.descripcionTarea);
    });
})

botonAgregar.addEventListener('click', function (e) {
    e.preventDefault();
    //Traigo el valor de la tarea al agregar
    const titulo = document.getElementById('nombreTarea').value.trim();
    const descripcionTarea = document.getElementById('descripcion').value.trim();
    if (!titulo || !descripcionTarea) {
        alert("Completa este campo");
        return;
    }
    
    //guardar localstorage
    const listaTareas = JSON.parse(localStorage.getItem("ToDo")) || [];
    listaTareas.push({titulo, descripcionTarea});
    localStorage.setItem("ToDo", JSON.stringify(listaTareas));
    //limpiar cuadros de tareas
    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcion').value = '';

    function mostrarTareas(titulo, descripcionTarea) {
        //Creo una nueva lista
        const nuevaLista = document.createElement('li');
        nuevaLista.className = 'listaToDo';
        nuevaLista.innerHTML = `
            <div>
                <img src="./img/pngtree-purple-round-border-image_2231965-removebg-preview.png" class="tareaCompletada" width=50px>
                <div>
                    <h2>${titulo}</h2>
                    <p>${descripcionTarea}</p>
                </div>
                <button type=submit class="eliminar">Eliminar</button>
            </div>
        `;
        // Cambiar imagen completada
        const img = nuevaLista.querySelector('.tareaCompletada');
        img.addEventListener('click', function () {
            img.src = './img/png-transparent-check-mark-symbol-purple-steven-universe-amethyst-gemstone-logo-violet-circle-removebg-preview.png';
        });
        // Eliminar tarea
        nuevaLista.querySelector('.eliminar').addEventListener('click', function () {
            nuevaLista.remove();
            eliminarLocal(titulo, descripcionTarea);
        });
        document.getElementById('listado').appendChild(nuevaLista);
    };
    mostrarTareas(titulo, descripcionTarea);

    function eliminarLocal(titulo, descripcionTarea) {
        const tareasGuardadas = JSON.parse(localStorage.getItem("ToDo")) || [];
        tareasGuardadas = tareasGuardadas.filter(tarea =>
            tarea.titulo !== titulo || tarea.descripcionTarea !== descripcionTarea
        );
        localStorage.setItem('ToDo', JSON.stringify(tareasGuardadas));
    }
});

// Borrar todo
const borrarTodo = document.getElementById("borrarTodo");
borrarTodo.addEventListener('click', function () {
    document.getElementById("listado").innerHTML = '';
    localStorage.removeItem('ToDo');
})

