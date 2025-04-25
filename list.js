
document.addEventListener('DOMContentLoaded', function () {
    const listado = document.getElementById('listado');
    const botonAgregar = document.getElementById('botonTarea');
    const borrarTodo = document.getElementById('borrarTodo');

    //Cargar tareas
    let tareasGuardadas = JSON.parse(localStorage.getItem("ToDo")) || [];
    tareasGuardadas.forEach(mostrarTareas)
    //Agregar Tarea
    botonAgregar.addEventListener('click', function (e) {
        e.preventDefault();
        //Traigo el valor de la tarea al agregar
        const titulo = document.getElementById('nombreTarea').value.trim();
        const descripcionTarea = document.getElementById('descripcion').value.trim();
        if (!titulo || !descripcionTarea) {
            alert("Completa este campo");
            return;
        }
        //Crear Diccionario de la tarea
        const tarea = {
            id: Date.now(), // Agregar ID
            titulo,
            descripcionTarea,
            completada: false
        };
        tareasGuardadas.push(tarea);
        localStorage.setItem("ToDo", JSON.stringify(tareasGuardadas));
        mostrarTareas(tarea);
        //limpiar cuadros de tareas
        document.getElementById('nombreTarea').value = '';
        document.getElementById('descripcion').value = '';
    });
    
    //Mostrar Tarea
    function mostrarTareas(tarea) {
        //Creo una nueva lista
        const nuevaLista = document.createElement('li');
        nuevaLista.className = 'listaToDo';
        nuevaLista.dataset.id = tarea.id;
        // Cambiar estado de imagen
        const imagen = tarea.completada ? './img/png-transparent-check-mark-symbol-purple-steven-universe-amethyst-gemstone-logo-violet-circle-removebg-preview.png' : './img/pngtree-purple-round-border-image_2231965-removebg-preview.png';

        nuevaLista.innerHTML = `
            <div>
                <img src="${imagen}" class="tareaCompletada" width=50px style="cursor:pointer;">
                <div>
                    <h2>${tarea.titulo}</h2>
                    <p>${tarea.descripcionTarea}</p>
                </div>
                <button type=submit class="eliminar">Borrar</button>
            </div>
        `;
        // Cambiar imagen completada
        const img = nuevaLista.querySelector('.tareaCompletada');
        img.addEventListener('click', function () {
            tarea.completada = !tarea.completada;
            img.src = img.src = tarea.completada ? './img/png-transparent-check-mark-symbol-purple-steven-universe-amethyst-gemstone-logo-violet-circle-removebg-preview.png': './img/pngtree-purple-round-border-image_2231965-removebg-preview.png';
            actualizarTarea(tarea); //local storage
        });
        // Eliminar tarea
        nuevaLista.querySelector('.eliminar').addEventListener('click', function () {
            nuevaLista.remove();
            tareasGuardadas = tareasGuardadas.filter(t => t.id !== tarea.id);
            localStorage.setItem("ToDo", JSON.stringify(tareasGuardadas));
        });
        listado.appendChild(nuevaLista);
    };
    // Actualizar tarea en localStorage
    function actualizarTarea(tareaActualizada) {
        tareasGuardadas = tareasGuardadas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t);
        localStorage.setItem("ToDo", JSON.stringify(tareasGuardadas));
    }
    // Borrar todo
    borrarTodo.addEventListener('click', function () {
        listado.innerHTML = '';
        tareasGuardadas = [];
        localStorage.removeItem('ToDo');
    });
});

