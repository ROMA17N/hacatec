
class DataManager {
    constructor(keySession) {
        this.keySession = keySession;
        this.dbSession = JSON.parse(localStorage.getItem(keySession)) || [];
    }

    create(objUsr) {
        this.dbSession.push(objUsr);
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
class Usuario {
    constructor(nombre, apellido, email, pass) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.pass = pass;
    }
}


const registroFrm = document.getElementById('RegistroFrm');
let objDataManager = new DataManager('persona');

registroFrm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir envío del formulario

    const nombre = document.getElementById('txtName').value;
    const apellido = document.getElementById('txtApellido').value;
    const email = document.getElementById('txtEmail').value;
    const pass = document.getElementById('txtPass').value;
    // Guardamos el nuevo usuario en el localStorage
    const objUsr = new Usuario(nombre, apellido, email, pass);
    objDataManager.create(objUsr);
    alert('los datos se registraron Exitosamente!!', 'alert alert-success');

    // Limpiamos el formulario
    this.reset();
    //objDataManager.deleteAll();
});

document.getElementById('frmLoging').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir envío del formulario

    const email = document.getElementById('txtUsuario').value;
    const password = document.getElementById('txtPassLog').value;

    const dbSession = objDataManager.read();
    const datosPersona = buscarId(email, dbSession);
    //   console.log("BD: " + dbSession.length);

    if (datosPersona !== -1) {
       // console.log(dbSession[datosPersona].pass);
        if (dbSession[datosPersona].pass === password) {
         //   console.log('Contrasenia correcta');
            window.location.href = "src/pages/dashboard2.html";
        }else{alert('Contraseña incorrecta')}

    } else {
        alert('No se encontro al usuario');
    }
    // limpar los campos del formulario
    document.querySelector("#frmLoging").reset();

});

function buscarId(email, db) {
    return db.findIndex(clavePersona => clavePersona.email === email);
}




//----------------------------------------------------------------------

function myMenuFunction() {
    // Obtener el elemento del menú de navegación
    let i = document.getElementById("navMenu");

    // Verificar la clase actual del menú de navegación
    if (i.className === "nav-menu") {
        // Si la clase es "nav-menu", añadir la clase "responsive" para mostrar el menú en dispositivos móviles

        i.className += " responsive";
    } else {
        // Si la clase no es "nav-menu", quitar la clase "responsive" para ocultar el menú en dispositivos móviles
        i.className = "nav-menu";
    }
}

// Obtener elementos relacionados con el botón de inicio de sesión, el botón de registro y los formularios de inicio de sesión y registro
let a = document.getElementById("loginBtn");
let b = document.getElementById("registerBtn");
let x = document.getElementById("login");
let y = document.getElementById("register");


// Función para mostrar el formulario de inicio de sesión
function login() {
    // Mover el formulario de inicio de sesión a la posición visible
    x.style.left = "4px";
    // Mover el formulario de registro fuera de la pantalla
    y.style.right = "-520px";
    // Cambiar estilos de los botones para resaltar el botón de inicio de sesión
    a.className += " white-btn";
    b.className = "btn";
    // Ajustar la opacidad para mostrar el formulario de inicio de sesión y ocultar el formulario de registro
    x.style.opacity = 1;
    y.style.opacity = 0;

}

// Función para mostrar el formulario de registro
function register() {
    // Mover el formulario de inicio de sesión fuera de la pantalla
    x.style.left = "-510px";
    // Mover el formulario de registro a la posición visible
    y.style.right = "5px";
    // Cambiar estilos de los botones para resaltar el botón de registro
    a.className = "btn";
    b.className += " white-btn";
    // Ajustar la opacidad para mostrar el formulario de registro y ocultar el formulario de inicio de sesión
    x.style.opacity = 0;
    y.style.opacity = 1;
}
