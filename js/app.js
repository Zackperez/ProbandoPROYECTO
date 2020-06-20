
/* REGISTRAR UN NUEVO USUARIO*/
function registrar(){
	/* Se crea una variable y se almacenan sus valores con .value*/
	var email = document.getElementById('email').value;
	var contrasena = document.getElementById('contrasena').value;

	/* Metodo de FireBase para crear Usuario 						Si hay error ejecuta esto*/			
	firebase.auth().createUserWithEmailAndPassword(email, contrasena)
	//SI SE CREO, SE EJECUTA ESTO ( ENVIA EL CORREO )
	.then(function(){
		verificar();
	})
	.catch(function(error) {
	  //Errores almacenados en variables
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // Errores mostrados por consola
	  console.log(errorCode);
	  console.log(errorMessage);
	  // ...
	})
} //Fin de la función


// Inicio de sesión de un usuario
function ingresar(){
	/* Se crea una variable y se almacenan sus valores con .value*/
	var email2 = document.getElementById('email2').value;
	var contrasena2 = document.getElementById('contrasena2').value;

	// Metodo de FireBase para crear Usuario 
	firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
	  //Errores almacenados en variables
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // Errores mostrados por consola
	  console.log(errorCode);
	  console.log(errorMessage);
	  // ...
	});

}

//¿Hay algún usuario activo?  VERIFICA TODA INTERACCION DE LA PAGINA

function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	console.log('usuario activo :D');
	  	aparece(user);
	    // Si hay usuario, mostrará esto
	    var displayName = user.displayName;
	    var email = user.email;

	    console.log('..................................');
	    console.log(user.emailVerified);
		console.log('..................................');	    

	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	    console.log('no existe Usuario no activo');
	  }
	});
}

observador(); //SOLO DE PRUEBA PARA VER EN CONSOLA EL DESULTADO DE OBSERVADOR

function aparece (user){
	var user = user;
	var contenido = document.getElementById('contenido');
	if (user.emailVerified) {
		contenido.innerHTML = '<p>Bienvenido</p> <button onclick ="cerrar()">Cerrar sesión</button>';
	}

}


function cerrar(){
	firebase.auth().signOut().then(function(){
		console.log('Saliendo');
	})
	.cath(function(error){
		console.log(error);
	})
}

function verificar(){

	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  // Email sent.
	  console.log('enviando correo...');
	}).catch(function(error) {
	  // An error happened.
	  console.log('Errrorxd');
	});

}