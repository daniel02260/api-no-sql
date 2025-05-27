export default async function mostrarHome() {
const app = document.getElementById("app");
app.innerHTML = `<h2>Busqueda FBI</h2><div id="lista" style="display: flex;
flex-wrap: wrap; gap: 10px; justify-content: space-between; padding:
10px;"></div>`;

const lista = document.getElementById("lista");

try {
const res = await
fetch("https://api.fbi.gov/wanted/v1/list");
const json = await res.json();

const data = json.results;

data.forEach((pokemon) => {
const id = pokemon.url.split("/")[6];
const item = document.createElement("div");

item.innerHTML = `
<p>${id} - ${pokemon.name}</p>
<img
src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/p
okemon/other/official-artwork/${id}.png" style="width: 100px; height:
100px;" />
`;

lista.appendChild(item);
});
} catch (error) {
app.innerHTML = `<p>Error al cargar:
${error.message}</p>`;
}
}
export default async function mostrarHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Búsqueda FBI</h2>
    <div id="lista" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; padding: 10px;"></div>
  `;

  const lista = document.getElementById("lista");

  try {
    const res = await fetch("https://api.fbi.gov/wanted/v1/list");
    const json = await res.json();
    const data = json.items || json.results; // depende de la respuesta exacta

    data.forEach((persona) => {
      const item = document.createElement("div");
      item.style.border = "1px solid #ccc";
      item.style.padding = "10px";
      item.style.width = "200px";
      item.style.borderRadius = "8px";
      item.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      item.style.textAlign = "center";

      item.innerHTML = `
        <p><strong>${persona.title}</strong></p>
        <img src="${persona.images?.[0]?.original || 'https://via.placeholder.com/150'}" style="width: 100px; height: 100px; object-fit: cover;" />
        <p>${persona.aliases?.[0] || persona.description || 'Sin descripción'}</p>
      `;

      lista.appendChild(item);
    });
  } catch (error) {
    app.innerHTML = `<p>Error al cargar: ${error.message}</p>`;
  }
}
