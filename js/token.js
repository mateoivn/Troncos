    const form = document.getElementById('loginForm');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const identity = document.getElementById('identity').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:8090/api/collections/users/auth-with-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identity: identity,
            password: password
          })
        });

        if (!res.ok) {
          throw new Error('Credenciales incorrectas');
        }

        const data = await res.json();

        // Guarda el token en localStorage
        localStorage.setItem('pocketbase_token', data.token);
        localStorage.setItem('pocketbase_user', JSON.stringify(data.record));

        mensaje.textContent = 'Login exitoso. Redirigiendo...';

        // Redireccionar a dashboard u otra página
        setTimeout(() => {
          window.location.href = 'admin_dashboard.html';
        }, 1500);

      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        mensaje.textContent = 'Error: ' + error.message;
      }
    });