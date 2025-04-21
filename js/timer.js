function cerrarSesion() {
    localStorage.removeItem('pocketbase_token');
    localStorage.removeItem('pocketbase_user');
    window.location.href = 'login.html';
  }
let timerInactividad;
    const tiempoLimite = 0.5 * 60 * 1000; // 5 minutos

    function reiniciarTimer() {
      clearTimeout(timerInactividad);
      timerInactividad = setTimeout(() => {
        alert('Sesión cerrada por inactividad.');
        cerrarSesion();
      }, tiempoLimite);
    }

    window.addEventListener('mousemove', reiniciarTimer);
    window.addEventListener('keydown', reiniciarTimer);
    window.addEventListener('click', reiniciarTimer);
    window.addEventListener('scroll', reiniciarTimer);

    reiniciarTimer();
    function cerrarSesion() {
        localStorage.removeItem('pocketbase_token');
        localStorage.removeItem('pocketbase_user');
        window.location.reload();
      }