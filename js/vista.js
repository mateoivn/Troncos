let productos = [];
let paginaActual = 1;
const productosPorPagina = 6;

async function cargarProductos() {
  try {
    const respuesta = await fetch('http://localhost:8090/api/collections/productos/records');
    const datos = await respuesta.json();
    productos = datos.items;
    mostrarProductos();
    mostrarPaginacion();
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

function mostrarProductos() {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = ''; // Limpiar antes de mostrar

  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productos.slice(inicio, fin);

  productosPagina.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto';

    // Usar imagen de respaldo si no hay imagen
    let urlImagen;
    if (producto.imagen) {
      urlImagen = `http://localhost:8090/api/files/productos/${producto.id}/${producto.imagen}`;
    } else {
      urlImagen = '/images/logoinstagram.png'; // Imagen de respaldo
    }

    div.innerHTML = `
      <img src="${urlImagen}" alt="${producto.nombre}" 
        onerror="this.onerror=null; this.src='/images/imagen-no-disponible.png';">
      <h2>${producto.nombre}</h2>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio}</strong></p>
    `;

    contenedor.appendChild(div);
  });
}

function mostrarPaginacion() {
  let paginacion = document.getElementById('paginacion');
  if (!paginacion) {
    paginacion = document.createElement('div');
    paginacion.id = 'paginacion';
    paginacion.style.textAlign = 'center';
    paginacion.style.margin = '20px';
    document.body.insertBefore(paginacion, document.querySelector('footer'));
  }
  paginacion.innerHTML = '';

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement('button');
    boton.textContent = i;
    boton.style.margin = '5px';
    boton.style.padding = '8px 12px';
    boton.style.borderRadius = '5px';
    boton.style.border = 'none';
    boton.style.backgroundColor = (i === paginaActual) ? '#f38e30fb' : '#ccc';
    boton.style.color = (i === paginaActual) ? 'white' : 'black';
    boton.addEventListener('click', () => {
      paginaActual = i;
      mostrarProductos();
      mostrarPaginacion();
    });
    paginacion.appendChild(boton);
  }
}

// Llamar al cargar la página
cargarProductos();
