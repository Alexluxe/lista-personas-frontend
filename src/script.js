const contenedor = document.getElementById('personas-container');
const botonRecargar = document.getElementById('recargar');
const filtroGenero = document.getElementById('filtro-genero');

function cargarDatos() {
  contenedor.innerHTML = '<p class="loading">Cargando datos...</p>';
  
  fetch('https://randomuser.me/api/?results=10&nat=us,es,mx')
    .then(res => res.json())
    .then(data => {
      contenedor.innerHTML = '';
      
      data.results.forEach(persona => {
        const card = document.createElement('div');
        card.className = 'card';

        const nombre = `${persona.name.first} ${persona.name.last}`;
        const genero = persona.gender === 'male' ? 'Masculino' : 'Femenino';
        const ubicacion = `${persona.location.city}, ${persona.location.country}`;
        const correo = persona.email;
        const fechaNac = new Date(persona.dob.date).toLocaleDateString();
        const foto = persona.picture.large;

        card.innerHTML = `
          <img src="${foto}" alt="Foto de ${nombre}" width="100" height="100">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Género:</strong> ${genero}</p>
          <p><strong>Ubicación:</strong> ${ubicacion}</p>
          <p><strong>Email:</strong> ${correo}</p>
          <p><strong>Nacimiento:</strong> ${fechaNac}</p>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      contenedor.innerHTML = `<p class="error">Ocurrió un error al cargar los datos. Por favor, inténtalo más tarde.</p>`;
      console.error('Error:', error);
    });
}

// Evento para recargar datos
botonRecargar.addEventListener('click', cargarDatos);

// Evento para filtrar por género
filtroGenero.addEventListener('change', function() {
  const genero = this.value;
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const mostrar = genero === 'todos' || 
                   (genero === 'male' && card.textContent.includes('Masculino')) || 
                   (genero === 'female' && card.textContent.includes('Femenino'));
    card.style.display = mostrar ? 'block' : 'none';
  });
});

// Cargar datos al iniciar
cargarDatos();