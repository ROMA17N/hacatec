
class DataManager {
    constructor(keySession) {
        this.keySession = keySession;
        this.dbSession = JSON.parse(localStorage.getItem(keySession)) || [];
    }

    read() {
        return this.dbSession;
    }

    deleteAll() {
        localStorage.clear(this.keySession);
        this.dbSession = [];
    }

    deleteUsr(index) {
        this.dbSession.splice(index, 1);
        //localStorage.removeItem(id);
        // Actualizar la sesión de almacenamiento con la versión actualizada de this.dbSession
        localStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }
} class Servicio {
    constructor(serviceType, region, servicio, horario, ubi, contacto, precio, descripcion) {
        this.serviceType = serviceType;
        this.region = region;
        this.servicio = servicio;
        this.horario = horario;
        this.ubi = ubi;
        this.contacto = contacto;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

let objBD = new DataManager('servicio');

document.getElementById('serviceForm').addEventListener('submit', function (event) {
    //   objBD.deleteAll();
    event.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional
    const serviceType = document.getElementById('idServiType').value;
    const region = document.getElementById("idRegion").value;

    this.reset();
    // objBD.deleteAll();
    const dbSession = objBD.read();
    const datosServices = buscarId(serviceType, dbSession);

    if (datosServices !== undefined) {
        const datosS = buscarRegion(region, dbSession);
        if (datosS !== undefined) {
            const divTabla = document.getElementById('valoresTa');
            divTabla.style.display = 'block';
            document.getElementById('cuerpoTa').textContent = "";
            const fila = document.createElement('tr');

            const celdas = ['serviceType', 'region', 'servicio', 'horario', "ubi", "contacto", "precio", "descripcion"].map(propiedad => {
                const celda = document.createElement('td');
                celda.textContent = datosS[propiedad];
                return celda;
            });

            // Crear celda para el botón "Reservar"
            const celdaReservar = document.createElement('td');
            const botonReservar = document.createElement('button');
            botonReservar.type = 'button';
            botonReservar.className = 'btn btn-primary';
            botonReservar.textContent = 'Reservar';

            botonReservar.addEventListener('click', function () {
                // Reemplaza 'script_o_pagina.html' con la ruta del script o página a la que quieres redirigir
                window.location.href = '../pages/transaccion.html'
            });
            celdaReservar.appendChild(botonReservar);

            fila.append(...celdas, botonReservar);
          //  console.log(fila)

            document.getElementById("cuerpoTa").appendChild(fila);

        } else {
            document.getElementById('valoresTa').style.display = 'none';
        }
    } else if (dbSession.length === 0) {
        alert('La base de datos no contiene informacion');
        document.getElementById('valoresTa').style.display = 'none';
    } else {
        alert('La base de datos aun no contiene esa informacion');
        document.getElementById('valoresTa').style.display = 'none';
    }
    // limpar los campos del formulario
    document.querySelector("#serviceForm").reset();

});

function buscarRegion(id, db) {
    return db.find(clavePersona => clavePersona.region === id);
}
function buscarId(id, db) {
    return db.find(clavePersona => clavePersona.serviceType === id);
}

// Redirecciones ------------------------------------------------------------------
document.getElementById('registrar').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    window.location.href = '../pages/dashboard.html'; // URL a la que quieres redirigir
});
document.getElementById('regresar').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    window.location.href = '../pages/indess.html'; // URL a la que quieres redirigir
});

