import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

import  mostrarHome from './componentes/home.js';
import  mostrarOriginal from './componentes/original.js';
import  mostrarPerfil from './componentes/perfil.js';
import  mostrarLogout from './componentes/logout.js';
import  mostrarLogin from './componentes/login.js';
import  mostrarRegistro from './componentes/registro.js';

function renderMenu(usuario) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  let botones = [];

  if (usuario) {
    botones = [
      { texto: "Home", fn: mostrarHome },
      { texto: "Original", fn: mostrarOriginal },
      { texto: "Perfil", fn: mostrarPerfil },
      { texto: "Logout", fn: mostrarLogout },
    ];
  } else {
    botones = [
      { texto: "Login", fn: mostrarLogin },
      { texto: "Registro", fn: mostrarRegistro },
    ];
  }

  botones.forEach(({ texto, fn }) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = fn;
    menu.appendChild(btn);
  });
}


onAuthStateChanged(auth, (user) => {
  renderMenu(user);
  if (user) {
    mostrarHome();
  } else {
    mostrarLogin();
  }
});
// Navegación de pestañas
document.querySelectorAll('[data-tab]').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-tab');
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    if (target === 'search') loadWantedList();
    if (target === 'favorites') showFavorites();
  });
});

let allPeople = [];

function loadWantedList() {
  fetch('https://api.fbi.gov/wanted/v1/list')
    .then(res => res.json())
    .then(data => {
      allPeople = data.items;
      displayResults(data.items, 'results');
    });
}

function displayResults(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(person => `
    <div class="card">
      <img src="${person.images[0]?.original || ''}" alt="${person.title}" />
      <h3>${person.title}</h3>
      <p>${person.subjects?.join(', ')}</p>
      ${person.reward_text ? `<p><strong>Recompensa:</strong> ${person.reward_text}</p>` : ''}
      <button onclick="saveFavorite('${person.uid}')">⭐ Guardar</button>
      <a href="${person.url}" target="_blank">Ver más</a>
    </div>
  `).join('');
}

function filterSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allPeople.filter(p => p.title.toLowerCase().includes(query));
  displayResults(filtered, 'results');
}

function filterByState() {
  const state = document.getElementById('filterState').value.toLowerCase();
  const filtered = allPeople.filter(p => p.title.toLowerCase().includes(state));
  displayResults(filtered, 'filteredResults');
}

function saveFavorite(uid) {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(uid)) {
    favs.push(uid);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('Agregado a favoritos');
  }
}

function showFavorites() {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  const favItems = allPeople.filter(p => favs.includes(p.uid));
  displayResults(favItems, 'favoritesList');
}
