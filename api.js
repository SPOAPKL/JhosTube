const API = "http://127.0.0.1:8000";

async function getJSON(ruta) {
  const res = await fetch(API + ruta);
  if (!res.ok) throw new Error("Error " + res.status);
  return res.json();
}

async function postJSON(ruta, cuerpo) {
  const res = await fetch(API + ruta, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
  if (!res.ok) throw new Error("Error " + res.status);
  return res.json();
}

function crearTarjeta(video) {
  const enlace = document.createElement("a");
  enlace.className = "tarjeta";
  enlace.href = "player.html?id=" + video.id;

  const img = document.createElement("img");
  img.src = video.thumbnail;
  img.alt = video.titulo;
  img.loading = "lazy";

  const titulo = document.createElement("h3");
  titulo.textContent = video.titulo;

  const cat = document.createElement("span");
  cat.textContent = video.categoria;

  enlace.append(img, titulo, cat);
  return enlace;
}

function mensajeVacio(texto) {
  const p = document.createElement("p");
  p.className = "vacio";
  p.textContent = texto;
  return p;
}