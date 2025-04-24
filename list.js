const botonAgregar = document.getElementById('botonTarea');

botonAgregar.addEventListener('click', function (e) {
    e.preventDefault();
    //Traigo el valor de la tarea al agregar
    const titulo = document.getElementById('nombreTarea').value.trim();
    const descripcionTarea = document.getElementById('descripcion').value.trim();
    if (!titulo || !descripcionTarea) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    //Creo una nueva lista
    const nuevaLista = document.createElement('li');
    nuevaLista.className = 'listaToDo';
    nuevaLista.innerHTML = `
        <div>
            <img src="./img/pngtree-purple-round-border-image_2231965-removebg-preview.png" class="tareaCompletada">
            <div>
                <h2>${titulo}</h2>
                <p>${descripcionTarea}</p>
            </div>
            <button type=submit id="eliminar">Eliminar</button>
        </div>
    `;
    //agregar nueva lista al listado
    document.getElementById("listado").appendChild(nuevaLista);
    //limpiar cuadros de tareas
    document.getElementById('nombreTarea').value = '';
    document.getElementById('descripcion').value = '';

    // Cambiar imagen completada
    const img = nuevaLista.querySelector('.tareaCompletada');
    img.addEventListener('click', function () {
        img.src = './img/png-transparent-check-mark-symbol-purple-steven-universe-amethyst-gemstone-logo-violet-circle-removebg-preview.png';
    });

    // Eliminar tarea
    const botonEliminar = nuevaLista.querySelector('#eliminar');
    botonEliminar.addEventListener('click', function () {
        nuevaLista.remove();
    });
    //guardar localstorage
    const tareaLista = `${titulo} - ${descripcionTarea}`;
    localStorage.setItem("ToDo", JSON.stringify(tareaLista));
    console.log(localStorage.getItem("ToDo"));

});


