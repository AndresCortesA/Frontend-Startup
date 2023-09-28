jQuery(function($) {
    // Evento que se dispara cuando se envía el formulario de inicio de sesión
    $('form').on('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Obten los datos del formulario de inicio de sesión
        const email = $("#email").val();
        const password = $("#password").val();

        // Crea un objeto con los datos del formulario
        const loginData = {
            Email: email,
            Password: password
        };

        // Realiza la solicitud POST para iniciar sesión
        fetch('http://localhost:1234/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta de la API aquí
            console.log('Respuesta de la API:', data);

            if (data.token) {
                // Si la API devuelve un token, el inicio de sesión fue exitoso
                alert('Inicio de sesión exitoso. Redirigiendo...');
                
                // Guarda el token en el almacenamiento local
                localStorage.setItem('token', data.token);

                // Redirige al usuario a la página que desees (por ejemplo, el panel de control)
                window.location.href = 'index.html';
            } else {
                // Si la API no devuelve un token, muestra un mensaje de error
                alert('Error en el inicio de sesión. Verifica tus credenciales.');
            }
        })
        .catch(error => {
            // Maneja cualquier error que ocurra durante la solicitud
            console.error('Error en la solicitud:', error);
            // Muestra un mensaje de error al usuario
            alert('Error en la solicitud al servidor. Inténtalo de nuevo más tarde.');
        });
    });

    // Ahora, para hacer una solicitud con el token en el encabezado:
    // Obtén el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Realiza una solicitud con el token en el encabezado
    fetch('http://localhost:1234/auth?', {
        method: 'GET', // o el método que corresponda
        headers: {
            'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
        }
    })
    .then(response => {
        // Maneja la respuesta de la solicitud aquí
    })
    .catch(error => {
        // Maneja los errores de la solicitud aquí
    });
});
