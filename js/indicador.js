document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('pocketbase_token');
  const mensajeSesion = document.getElementById('mensajeSesion');

  if (mensajeSesion) {
    if (token){
      mensajeSesion.textContent = 'admin';
    }
  }
});

const token = localStorage.getItem('pocketbase_token');
    
const loginDiv = document.querySelector('.login');
if (token) {
    // Si hay token, cambiamos el contenido
    loginDiv.innerHTML = `
        <a href="/model/admin_dashboard.html"><h1>Gestionar</h1></a>
    `;
} else {
    // Si no hay token, mostramos el botón de Acceder
    loginDiv.innerHTML = `
        <a href="/model/login.html"><h1>Acceder</h1></a>
    `;
}
