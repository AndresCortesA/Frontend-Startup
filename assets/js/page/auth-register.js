$(document).ready(function () {
    // Generar un número aleatorio de 7 cifras
    function generateRandomNumber() {
      return Math.floor(1000000 + Math.random() * 9000000);
    }
  
    // Establecer el número aleatorio como valor predeterminado en el campo de Username
    $("#Username").val(generateRandomNumber());
  
    // Evento que se dispara cuando se envía el formulario de registro
    $('form').submit(function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
      // Obtén los datos del formulario
      const userData = {
        "FullName": $("#FullName").val(), // Convertir a cadena si es necesario
        "Email": $("#Email").val(),
        "Username": parseInt($("#Username").val()),
        "Password": $("#Password").val(),
        "Phone": parseInt($("#Phone").val()), // Convertir a entero si es necesario
        "Role": $("#Role").val()
      };
  
      // Realiza la solicitud POST a tu API
      fetch('http://localhost:1234/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta de la API aquí
        console.log('Respuesta de la API:', data);
        
        if (data.error) {
          // Si la API devuelve un mensaje de error, muestra un mensaje de error al usuario
          alert('Error en el registro puede que ya exista el usuario o los datos estan mal ingresados: ' + data.error);
        } else {
          // Si la API no devuelve errores, puedes mostrar un mensaje de éxito al usuario
          alert('Registro exitoso. Redirigiendo a la página de inicio de sesión...');
          // Puedes redirigir al usuario a otra página aquí si es necesario

        }
      })
      .catch(error => {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error en la solicitud:', error);
        // Muestra un mensaje de error al usuario
        alert('Error en la solicitud al servidor. Inténtalo de nuevo más tarde.');
      });
    });
});
