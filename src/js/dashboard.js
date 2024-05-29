
class DataManager {
    constructor(keySession) {
        this.keySession = keySession;
        this.dbSession = JSON.parse(localStorage.getItem(keySession)) || [];
    }

    create(objServi) {
        this.dbSession.push(objServi);
        localStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }

    read() {
        return this.dbSession;
    }
    update(collection) {
        localStorage.setItem(this.keySession, JSON.stringify(collection));
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
}
class Servicio {
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
    const servicio = document.getElementById('idServicio').value;
    const horario = document.getElementById('idHorario').value;
    const ubi = document.getElementById('idUbi').value;
    const contacto = document.getElementById('idContacto').value;
    let precio = document.getElementById('idPrecio').value;
    const descripcion = document.getElementById('idDescripcion').value;

    precio += precio * .15
    const objServi = new Servicio(serviceType, region, servicio, horario, ubi, contacto, precio, descripcion);
    objBD.create(objServi); 
    alert('los datos se registraron Exitosamente!!', 'alert alert-success');
    this.reset();
 //    objBD.deleteAll();
});

document.getElementById('regresar').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    window.location.href = '../pages/dashboard2.html'; // URL a la que quieres redirigir
});