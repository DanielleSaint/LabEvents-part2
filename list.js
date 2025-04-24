const botonAgregar = document.getElementById('botonTarea')

botonAgregar.addEventListener('click', function (e) {
    e.preventDefault();
    //Traigo el valor de la tarea al agregar
    const titulo = document.getElementById('nombreTarea').value;
    const descripcionTarea = document.getElementById('descripcion').value;
    //Creo una nueva lista
    const nuevaLista = document.createElement('li');
    nuevaLista.className.add('listaToDo')
    nuevaLista.innerHTML = `
        <div>
            <img>
            <div>
                <h2>${titulo}</h2>
                <p>${descripcionTarea}</p>
            </div>
            <button type=submit id="elminar">Eliminar</button>
        </div>
    `
    
    
    
    const nuevaTarea = document.createElement('div');
    nuevaTarea.classList.add('tarea', categoria);
    nuevaTarea.innerHTML = `
    <h3>${titulo}</h3>
    <p>${descripcionTarea}</p>
    `;

})